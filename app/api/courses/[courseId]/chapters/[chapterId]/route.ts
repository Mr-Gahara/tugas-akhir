import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Mux, { Mux as MuxType } from "@mux/mux-node";

const mux: MuxType = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("You're not the owner of the course", {
        status: 403,
      });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // Handle video/Mux data deletion if chapter has video
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        try {
          await mux.video.assets.delete(existingMuxData.assetId);
          console.log(`Deleted Mux asset: ${existingMuxData.assetId}`);
        } catch (err) {
          console.warn("Failed to delete existing Mux asset:", err);
        }

        // Delete the muxData record
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
        console.log(`Deleted Mux data record: ${existingMuxData.id}`);
      }
    }

    // Delete the chapter (regardless of whether it has video or not)
    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    console.log(`Deleted chapter: ${deletedChapter.id}`);

    // Check if there are any published chapters left in the course
    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    // If no published chapters remain, unpublish the course
    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false, // Fixed typo: was "isPublished"
        },
      });
      console.log(
        `Unpublished course: ${params.courseId} (no published chapters remaining)`
      );
    }

    return NextResponse.json(
      {
        message: "Chapter deleted successfully",
        deletedChapter: {
          id: deletedChapter.id,
          title: deletedChapter.title,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error in DELETE /api/courses/[courseId]/chapters/[chapterId]:",
      error
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    const { isPublished, videoUrl, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("You're not the owner of the course", {
        status: 403,
      });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    // Handle video upload separately
    if (videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        try {
          await mux.video.assets.delete(existingMuxData.assetId);
        } catch (err) {
          console.warn("Failed to delete existing Mux asset:", err);
        }

        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      try {
        const asset = await mux.video.assets.create({
          input: videoUrl,
          playback_policy: ["public"],
          test: process.env.NODE_ENV !== "production",
          inputs: [],
        });

        console.log("Created Mux asset:", asset.id);
        console.log("Playback IDs:", asset.playback_ids);

        await db.muxData.create({
          data: {
            chapterId: params.chapterId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id,
          },
        });

        // Update the chapter with the video URL
        await db.chapter.update({
          where: {
            id: params.chapterId,
          },
          data: {
            videoUrl: videoUrl,
          },
        });

        console.log("Mux data created successfully");
      } catch (err) {
        console.error("Mux video upload failed:", err);
        return new NextResponse("Failed to upload video to Mux", {
          status: 500,
        });
      }
    }

    // Handle publishing separately
    if (typeof isPublished === "boolean") {
      await db.chapter.update({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
        data: {
          isPublished,
        },
      });
    }

    // Return updated chapter with muxData
    const updatedChapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
      include: {
        muxData: true,
      },
    });

    return NextResponse.json(updatedChapter, { status: 200 });
  } catch (error) {
    console.error(
      "Error in PATCH /api/courses/[courseId]/chapters/[chapterId]:",
      error
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

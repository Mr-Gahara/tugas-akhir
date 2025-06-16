import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        };

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if (!courseOwner) {
            return new Response("you do not have permission to access it", { status: 401 });
        };

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        });

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: params.chapterId,
            }
        });

        if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return new Response("missing required fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedChapter);
    } catch (error) {
        console.error("Error publishing chapter:", error);
        return new NextResponse("Failed to publish chapter", { status: 500 });
    }
}
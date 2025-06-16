import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) {
  try {
    console.log("DELETE request received");
    console.log("Params:", params);
    console.log("CourseId:", params.courseId);
    console.log("AttachmentId:", params.attachmentId);

    const { userId } = await auth();
    if (!userId) {
      console.log("No user ID found");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("User ID:", userId);

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }, 
    });

    if (!courseOwner) {
      console.log("Course not found or user is not owner");
      return new NextResponse("You are not the course owner", { status: 403 });
    }

    console.log("Course owner verified, attempting to delete attachment");

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });

    console.log("Attachment deleted successfully:", attachment);
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID_ERROR:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
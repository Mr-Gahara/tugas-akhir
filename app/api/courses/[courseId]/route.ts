import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = await auth();
        const { courseId } = params;
        const values = await request.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // if (!title) {
        //     return new NextResponse("Title is required", { status: 400 });
        // }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId: userId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
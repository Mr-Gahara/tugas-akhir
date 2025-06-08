import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const { title } = await request.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            },
        });
        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}



// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//     try {
//         const { userId } = await auth();
//         const { title } = await request.json();

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         // Verify user exists in your database
//         // const userExists = await db.user.findUnique({
//         //     where: { id: userId }
//         // });

//         // if (!userExists) {
//         //     return new NextResponse("User not found in database", { status: 404 });
//         // }

//         // Validate title format
//         if (typeof title !== "string" || title.length < 3) {
//             return new NextResponse("Invalid title format", { status: 400 });
//         }

//         const course = await db.course.create({
//             data: {
//                 title,
//                 userId, // Ensure this matches your schema field name
//             },
//         });

//         return NextResponse.json(course);

//     } catch (error) {
//         console.error("[COURSES_ERROR]", error);
//         return new NextResponse(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), { 
//             status: 500,
//             // Add error details for development
//             headers: { 'Content-Type': 'application/json' }
//         });
//     }
// }
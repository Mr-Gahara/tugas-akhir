import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid"; // Ensure uuid is imported

// Instantiate Midtrans Snap API client
const snap = new midtransClient.Snap({
  isProduction: false, 
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
      include: {
        category: true,
      }
    });

    if (!course) {
      return new NextResponse("Kursus tidak ditemukan", { status: 404 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Kursus sudah dibeli", { status: 400 });
    }
    
    // --- KEY MODIFICATION ---
    // Generate a standard UUID for the order_id. It's under the 50-char limit.
    const orderId = uuidv4();
    const grossAmount = Math.round(course.price || 0);

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id: course.id,
          price: grossAmount,
          quantity: 1,
          name: course.title,
          category: course.category?.name || "Online Course",
        },
      ],
      customer_details: {
        first_name: user.firstName || user.username || "User",
        last_name: user.lastName || "",
        email: user.emailAddresses[0].emailAddress,
      },
      // --- KEY MODIFICATION ---
      // Pass courseId and userId in custom fields for the webhook to use.
      custom_field1: course.id,
      custom_field2: user.id,
    };

    const token = await snap.createTransactionToken(parameter);

    return NextResponse.json({ token });

  } catch (error) {
    console.error("[COURSE_CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

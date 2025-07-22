import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

// This is the handler for incoming Midtrans webhooks.
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Secure the webhook by verifying the signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
        console.error("MIDTRANS_SERVER_KEY is not set");
        return new NextResponse("Webhook Error: Server configuration missing", { status: 500 });
    }

    const signatureKey = crypto
      .createHash("sha512")
      .update(body.order_id + body.status_code + body.gross_amount + serverKey)
      .digest("hex");

    if (signatureKey !== body.signature_key) {
      return new NextResponse("Webhook Error: Invalid signature", { status: 401 });
    }

    // 2. Process only successful transactions
    if (body.transaction_status === "settlement" || body.transaction_status === "capture") {
      
      // 3. Parse metadata from the order_id
      const orderIdParts = body.order_id.split('-');
      if (orderIdParts.length < 4 || orderIdParts[0] !== 'course' || orderIdParts[2] !== 'user') {
          console.error("Webhook Error: Could not parse metadata from order_id:", body.order_id);
          return new NextResponse("Webhook Error: Invalid order_id format", { status: 400 });
      }
      
      const courseId = orderIdParts[1];
      const userId = orderIdParts[3];

      // 4. Check if a purchase record already exists to prevent duplicates
      const existingPurchase = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: userId,
            courseId: courseId,
          },
        },
      });

      if (existingPurchase) {
        console.log("Purchase already exists for order:", body.order_id);
        return NextResponse.json({ received: true });
      }

      // 5. Create the purchase record in the database
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });

      console.log(`Successfully created purchase for course ${courseId} by user ${userId}`);
    }

    // Acknowledge receipt of the webhook to Midtrans
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("[MIDTRANS_WEBHOOK_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

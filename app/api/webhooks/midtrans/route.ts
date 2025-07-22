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
      
      // --- KEY MODIFICATION ---
      // Retrieve metadata from the custom fields instead of the order_id.
      const courseId = body.custom_field1;
      const userId = body.custom_field2;

      // Validate that the custom fields exist.
      if (!courseId || !userId) {
          console.error("Webhook Error: Missing custom_field1 or custom_field2 in webhook body");
          return new NextResponse("Webhook Error: Missing required custom fields", { status: 400 });
      }

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

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

// Replace this with your actual shared secret in the environment variable
const SHARED_SECRET = process.env.x_cc_webhook_signature;

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // Get the raw body as text
    const signature = req.headers.get("X-CC-WEBHOOK-SIGNATURE");

    if (!signature) {
      return NextResponse.json({ error: "Signature not found" }, { status: 400 });
    }

    // Verify the signature using the shared secret
    const hash = crypto.createHmac("sha256", SHARED_SECRET!).update(rawBody).digest("hex");

    if (hash !== signature) {
      console.error("Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Parse the raw body (which is a JSON string) to JSON
    const payload = JSON.parse(rawBody);
    console.log("Received Coinbase Commerce Payload:", payload);

    // Update the order status in the database
    await prisma.order.update({
      where: { id: payload.event.data.metadata.order_id },
      data: { payment: true },
    });

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error); // Log the error for debugging
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}
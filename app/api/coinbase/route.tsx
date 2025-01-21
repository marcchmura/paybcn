import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

// Your shared secret for webhook verification
const SHARED_SECRET = process.env.x_cc_webhook_signature;

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
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

    // Parse the raw body to JSON
    const payload = JSON.parse(rawBody);
    console.log("Received Coinbase Commerce Payload:", payload);

    // Update the order status in the database
    const order = await prisma.order.update({
      where: { id: payload.event.data.metadata.order_id },
      data: { payment: true },
    });

    //telegram Bot api
    const message = `📦 New Order Received!\n\nOrder ID: ${order.title}\nPayment Status: ✅ Paid`;
    const telegramApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHANNEL_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!telegramResponse.ok) {
      console.error("Failed to send message via Telegram:", await telegramResponse.text());
    } else {
      console.log("Telegram notification sent successfully!");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import nodemailer from "nodemailer";

// Replace with your OVH SMTP credentials
const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465, // SSL
  secure: true,
  auth: {
    user: process.env.OVH_EMAIL, // Full email address
    pass: process.env.OVH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
  debug: true, // Enable debugging logs
});

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

    const senderEmail =
      process.env.OVH_EMAIL ||
      (() => {
        throw new Error("OVH_EMAIL is not defined in the environment variables");
      })();

    const recipientEmail =
      order.email ||
      (() => {
        throw new Error("Order email is not defined");
      })();

    // Create email HTML content
    const htmlContent = `
      <html>
        <body>
          <h2>Order Confirmation</h2>
          <p>Thank you for your order!</p>
          <div style="margin: 20px 0;">
            <p><strong>Order Details:</strong></p>
            <p>Title: ${order.title}</p>
            <p>Price: ${order.price} ${order.currency}</p>
          </div>
        </body>
      </html>
    `;

    // Configure email options
    const mailOptions = {
      from: senderEmail,
      to: recipientEmail,
      cc: "ping@paybcn.com",
      subject: "Order Confirmation",
      html: htmlContent,
      text: `Order Confirmation\n\nThank you for your order!\n\nOrder Details:\nTitle: ${order.title}\nPrice: ${order.price} ${order.currency}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}

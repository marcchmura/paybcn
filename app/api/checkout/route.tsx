import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const orderSchema = z.object({
  email: z.string().email().max(400),
  url: z.string().url().max(1000),
  title: z.string().min(3).max(400),
  price: z.coerce.number().positive(),
  currency: z.enum(["USD", "EUR", "GBP", "SGD", "SEK", "PLN", "RUB", "CHF", "CNY", "BRL"]),
  name: z.string().min(2).max(255),
  address: z.string().min(5).max(1000),
  city: z.string().min(2).max(100),
  zip: z.string().min(2).max(20),
  country: z.string().min(2).max(30),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📥 Received body:", body);

    if (!body || typeof body !== "object") {
      console.error("❌ Invalid JSON body received");
      throw new TypeError("Invalid JSON payload");
    }

    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      const errorDetails = validation.error.flatten();
      console.warn("⚠️ Validation errors:", errorDetails);
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: errorDetails.fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      email, url, title, price, currency,
      name, address, city, zip, country,
    } = validation.data;

    console.log("✅ Validation passed. Creating order with:");
    console.log({ email, url, title, price, currency, name, address, city, zip, country });

    const order = await prisma.order.create({
      data: {
        email,
        url,
        title,
        price,
        currency,
        name: name,
        address: address,
        city: city,
        postcode: zip,
        country: country,
        payment: false,
      },
    });

    if (!order?.id) {
      console.error("❌ Failed to create order in database");
      throw new Error("Order creation returned no ID");
    }

    console.log("✅ Order created successfully:", order.id);

    return NextResponse.json(
      {
        status: "success",
        redirectUrl: order.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

// Define schema only for the form-submitted fields
const orderFormSchema = z.object({
  variant: z.string().default(""),
  checkoutId: z.string().uuid({
    message: "Invalid checkout ID",
  }),
  name: z.string().min(2).max(255, {
    message: "Name must be between 2 and 255 characters",
  }),
  address: z.string().min(5).max(1000, {
    message: "Address must be between 5 and 1000 characters",
  }),
  zip: z.string().min(2).max(20, {
    message: "Postcode must be between 2 and 20 characters",
  }),
  city: z.string().min(2).max(100, {
    message: "City must be between 2 and 100 characters",
  }),
  country: z.enum(["United States", "United Kingdom", "France", "Singapore"], {
    errorMap: () => ({ message: "Invalid country selection" }),
  }),
});

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    console.log("Received data:", rawData);

    // Validate the form data
    const validationResult = orderFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.log("Validation errors:", validationResult.error.flatten());
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedFormData = validationResult.data;

    // Fetch the checkout data
    const checkout = await prisma.checkout.findUnique({
      where: { id: validatedFormData.checkoutId },
      select: {
        id: true,
        telegram: true,
        title: true,
        price: true,
        url: true,
        currency: true,
        status: true,
      },
    });

    if (!checkout) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid checkout ID",
        },
        { status: 400 }
      );
    }

    if (checkout.status) {
      return NextResponse.json(
        {
          status: "error",
          message: "This checkout has already been processed",
        },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        variant: validatedFormData.variant,
        shipping_name: validatedFormData.name,
        shipping_address: validatedFormData.address,
        shipping_postcode: validatedFormData.zip,
        shipping_city: validatedFormData.city,
        shipping_country: validatedFormData.country,
        checkoutId: checkout.id,
        telegram: checkout.telegram,
        title: checkout.title,
        price: checkout.price,
        url: checkout.url,
        currency: checkout.currency,
        payment: false,
      },
    });

    await prisma.checkout.update({
      where: { id: checkout.id },
      data: { status: true },
    });

    if (!order?.id) {
      throw new Error("Failed to create order");
    }

    return NextResponse.json(
      {
        status: "success",
        redirectUrl: order.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

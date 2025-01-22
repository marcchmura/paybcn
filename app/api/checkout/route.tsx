import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const orderSchema = z.object({
  url: z.string().url({ message: "Must be a valid URL" }).max(1000),
  email: z.string().email({ message: "Email must be valid" }).max(400),
  title: z.string().min(3).max(400),
  price: z.number().positive({ message: "Price must be a positive number" }),
  currency: z.enum(["USD", "EUR", "GBP", "SGD"], {
    errorMap: () => ({ message: "Invalid currency" })
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body)
    const validateFields = orderSchema.safeParse(body);

    if (!validateFields.success) {
      const { fieldErrors } = validateFields.error.flatten();
      return NextResponse.json(
        {
          status: "error",
          errors: fieldErrors,
          message: "Validation failed",
        },
        { status: 400 }
      );
    }
    console.log('fields pretty validated')
    const validatedData = validateFields.data;
    console.log('fields validated')
    const checkout = await prisma.checkout.create({
      data: {
        telegram: validatedData.email,
        title: validatedData.title,
        price: validatedData.price,
        url: validatedData.url,
        currency: validatedData.currency,
      },
    });

    if (!checkout?.id) {
      throw new Error("Failed to create checkout");
    }

    return NextResponse.json(
      { 
        status: "success",
        redirectUrl: checkout.id 
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Error processing order:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          status: "error",
          message: "Validation failed",
          errors: error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        status: "error",
        message: "Internal server error" 
      }, 
      { status: 500 }
    );
  }
}
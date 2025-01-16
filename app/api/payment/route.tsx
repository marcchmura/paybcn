import { NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json(); // Ensure the body has "orderId"
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 401 });
    }

    const checkout_price = (order.price * 1.3).toFixed(2);

    const data = {
      name: "okeo",
      description: `Order`,
      pricing_type: "fixed_price",
      local_price: {
        amount: checkout_price,
        currency: order.currency,
      },
      metadata: {
        order_id: orderId,
      },
      redirect_url: `https://bulle.co/app/dashboard`,
      cancel_url: `https://bulle.co/app/dashboard`,
    };

    const config = {
      method: "post",
      url: "https://api.commerce.coinbase.com/charges",
      headers: {
        "X-CC-Api-Key": process.env.COINBASE_COMMERCE_API_KEY,
        "X-CC-Version": "2018-03-22",
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios(config);
    const chargeData = response.data;

    return NextResponse.json({ url: chargeData.data.hosted_url });
  } catch (error: unknown) { // Specify 'unknown' type for the error
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error("Error creating Coinbase charge:", error.message);
      return NextResponse.json(
        { error: "Failed to create charge", details: error.message },
        { status: 500 }
      );
    } else if (error instanceof Error) {
      // Handle general Error
      console.error("General error:", error.message);
      return NextResponse.json(
        { error: "Failed to create charge", details: error.message },
        { status: 500 }
      );
    }

    // Fallback if error is of an unknown type
    console.error("Unknown error:", error);
    return NextResponse.json(
      { error: "Failed to create charge", details: "Unknown error" },
      { status: 500 }
    );
  }
}

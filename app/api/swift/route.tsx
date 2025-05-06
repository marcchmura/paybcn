import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const zyteApiKey = process.env.ZYTE_API_KEY;
    if (!zyteApiKey) {
      throw new Error("API key is missing");
    }

    new URL(url);

    const { data } = await axios.post(
      "https://api.zyte.com/v1/extract",
      {
        url,
        httpResponseBody: true,
        product: true,
        productOptions: { extractFrom: "httpResponseBody" },
      },
      {
        auth: { username: zyteApiKey, password: "" },
        timeout: 10000,
      }
    );

    const { product } = data;
    console.log("Product found");

    return NextResponse.json({
      product,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    const status = error instanceof Error && error.message === "API key is missing" ? 500 : 400;
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process request",
      },
      { status }
    );
  }
}

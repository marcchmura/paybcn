import ProductForm from "@/components/forms/product-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Example() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-8 flex-col">
      <div className="flex flex-col items-center space-y-2 lg:w-86">
        <h3 className="text-xl tracking-tight text-pretty">Shop with Crypto as Easily as Cash.</h3>
        <h3 className="text-xl tracking-tight text-pretty">Fast. Reliable. Secure.</h3>
        <p className="sr-only">Paybcn lets you create an order for a product, fill in your shipping details, and then acts as an intermediary to place the order for you, paying with your chosen cryptocurrency.</p>
      </div>
      <Link href={"/testimonials"} className="text-xs w-full">
        <div className="flex space-x-2 justify-between  items-center">
          <div className="flex flex-col">
            <div className="flex fill-current">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-3">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip={"evenodd"}
                />
              </svg>
            </div>
            <span className="text-xs">4.8 out of 5</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-xs">10K</span>
            <span className="text-xs">Community</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-xs">1M</span>
            <span className="text-xs">Products</span>
          </div>

          <ArrowRight className="h-4" />
        </div>
      </Link>
      <ProductForm />
      <p className="text-sm text-muted-foreground">Clears instantly 24/7</p>
    </div>
  );
}

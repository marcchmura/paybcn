import ProductForm from "@/components/forms/product-form";
export default function Example() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-8 flex-col">
      <div className="flex flex-col items-center space-y-2 lg:w-86">
        <h3 className="text-xl tracking-tight text-pretty">Shop with Crypto as Easily as Cash.</h3>
        <h3 className="text-xl tracking-tight text-pretty">Fast. Reliable. Secure.</h3>
      </div>
      <ProductForm />
      <p className="text-sm text-muted-foreground">Clears instantly 24/7</p>
    </div>
  );
}

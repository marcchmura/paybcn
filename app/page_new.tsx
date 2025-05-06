import ProductForm from "@/components/forms/product-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Example() {
  return (
    <div className="relative flex flex-col md:flex-row md:space-x-12 items-start justify-center px-6 lg:px-8 py-8 md:max-w-5xl mx-auto">
      <ProductForm />
    </div>
  );
}

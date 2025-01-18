import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[800px]">
      <h3 className="text-xl tracking-tight text-pretty line-clamp-2 text-ellipsis overflow-hidden">Frequently Asked Questions</h3>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Paybcn?</AccordionTrigger>
          <AccordionContent>Paybcn is a shopping intermediary that helps you purchase products with crypto. You can create shopping wish lists by adding product links, and we'll handle the checkout process using your shipping credentials.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What stores can I shop from?</AccordionTrigger>
          <AccordionContent>You can add products from virtually any online store that supports standard shopping carts. Once we process your order, we’ll send it directly to the store for fulfillment using your shipping credentials.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How secure is my payment and personal information?</AccordionTrigger>
          <AccordionContent>We prioritize your privacy and security. Payments are processed through secure cryptocurrency payment systems, and your personal details, including shipping information, are stored with the highest encryption standards.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What cryptocurrencies do you accept?</AccordionTrigger>
          <AccordionContent>We currently accept USDC (USD Coin) for all transactions. This ensures fast, secure, and stable payments for your shopping experience.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

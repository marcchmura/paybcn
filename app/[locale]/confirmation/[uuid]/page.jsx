import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getOrderData(uuid) {
  const OrderData = await prisma.order.findUnique({
    where: { id: uuid },
    select: {
      id: true,
      title: true,
      price: true,
      telegram: true,
      currency: true,
      payment: true,
      shipping_name: true,
    },
  });

  if (!OrderData) {
    notFound();
  }
  return OrderData;
}

export default async function CheckoutPage({ params }) {

  const OrderData = await getOrderData(params.uuid);


  const subtotal = Number(OrderData.price).toFixed(2);
  const transaction_fee = (OrderData.price * 0.3).toFixed(2);
  const total = (Number(subtotal) + Number(transaction_fee)).toFixed(2);
  const uuid = params.uuid;
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[400px]">
      <h3 className="text-xl tracking-tight text-pretty line-clamp-2 text-ellipsis overflow-hidden">Thank you, {OrderData.shipping_name}</h3>

      <Badge>Payment successful</Badge>


      <div className="bg-muted flex justify-center items-center flex-col space-y-6 p-6 rounded-lg w-full">
        
        <div className="mx-auto w-full">
          <h2 id="summary-heading" className="sr-only">
            Order confirmation
          </h2>
          <dl className="space-y-2">

            <dt className=" font-medium mt-2">{OrderData.title}</dt>
            <dd className="mt-1 text-xs text-muted-foreground tracking-tight pb-4">
              {OrderData.id}
            </dd>
          </dl>

        </div>
        
      </div>
      
      <p className="text-sm text-muted-foreground">Check your email for a confirmation. Need help? Our 24/7 support team is just a chat away!</p>
      <Link href={'/'}><Button>Back to home page</Button></Link>

    </div>
  );
}

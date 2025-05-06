import { prisma } from "@/lib/db";
import { Input } from "@/components/ui/input";
import CoinbaseButton from "@/components/forms/coinbase-button";
import { notFound, redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { getCurrencySymbol } from "@/lib/symbol";
import { CheckCircle } from "lucide-react";

async function getOrderData(uuid) {
  const OrderData = await prisma.order.findUnique({
    where: { id: uuid },
    select: {
      id: true,
      title: true,
      price: true,
      email: true,
      url: true,
      postcode: true,
      address: true,
      country: true,
      currency: true,
      payment: true,
    },
  });

  if (!OrderData) {
    notFound();
  }
  return OrderData;
}

export default async function CheckoutPage({ params }) {

  const OrderData = await getOrderData(params.uuid);


  if (OrderData.payment === true) {
    redirect("/confirmation/" + OrderData.id);
  }

  const symbol = getCurrencySymbol(OrderData.currency)
  const subtotal = Number(OrderData.price).toFixed(2);
  const transaction_fee = (OrderData.price * 0.3).toFixed(2);
  const total = (Number(subtotal) + Number(transaction_fee)).toFixed(2);
  const uuid = params.uuid;
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:max-w-5xl">
      <div className="flex justify-between items-center w-full">
        <h3 className="text-2xl tracking-tight text-pretty line-clamp-2 text-ellipsis overflow-hidden">Order summary</h3>
      </div>  
      <div className="flex flex-col md:flex-row justify-between md:space-x-12 space-y-6 md:space-y-0">
<div className="flex flex-col md:w-1/2 space-y-6">
      

      <div className="space-y-2 flex flex-col w-full">
      <div className="flex justify-between w-full">
      <Label>Contact</Label>
      <CheckCircle className="h-4 text-primary"/>
      </div>
      <Input type="text" className="lowercase" value={`${OrderData.email}`} disabled />
      </div>



      </div>
<div className="flex flex-col space-y-8 md:w-1/2">
      <div className=" flex justify-start items-start flex-col space-y-8 rounded-xl w-full">
        <div className="mx-auto w-full">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <dl>
            <dt className="text-sm font-medium">Amount due</dt>
            <dd className="mt-1 text-3xl font-bold tracking-tight pb-4">
              {symbol}
              {total}
            </dd>
          </dl>

          <ul role="list" className="text-sm">
            <li className="flex items-start space-x-4 pt-4">
              <div className="flex-auto space-y-1">
                <h3 className=" font-regular">Subtotal</h3>
              </div>
              <p className="flex-none text-sm font-medium">
                {symbol}
                {subtotal}
              </p>
            </li>

            <li className="flex items-start space-x-4 py-4">
              <div className="flex-auto space-y-1">
                <h3 className=" font-regular">Transaction fee</h3>
              </div>
              <p className="flex-none text-sm font-medium">
                {symbol}
                {transaction_fee}
              </p>
            </li>
          </ul>

          <dl className="space-y-6 text-base font-medium">
            <div className="flex items-center justify-between pt-4">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">
                {symbol}
                {total}
              </dd>
            </div>
          </dl>
        </div>
        <CoinbaseButton orderId={uuid} />
        <p className="text-xs/5 text-muted-foreground">By continuing, you acknowledge that all purchases are final—no returns or refunds are accepted. You understand that you are not buying directly from this store, and authorize Paybcn to place the associated order on your behalf.</p>

      </div>

      </div>
      </div>
    </div>
  );
}

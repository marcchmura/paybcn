import { prisma } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import CoinbaseButton from "@/components/forms/coinbase-button";
import { notFound, redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { getCurrencySymbol } from "@/lib/symbol";

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
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[400px]">
      <h3 className="text-xl tracking-tight text-pretty line-clamp-2 text-ellipsis overflow-hidden">Pay {symbol}{total} to process your order</h3>
      <Progress value={75} />
      <div className="space-y-2 flex flex-col w-full">
      <Label>Contact information</Label>
      <Input type="text" value={`${OrderData.telegram}`} disabled />
      </div>


      <div className="bg-muted flex justify-center items-center flex-col space-y-6 p-6 rounded-lg w-full">
        <div className="mx-auto w-full">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <dl>
            <dt className="text-sm font-medium">Payment details</dt>
            <dd className="mt-1 text-3xl font-bold tracking-tight pb-4">
              {symbol}
              {total}
            </dd>
          </dl>

          <ul role="list" className="text-sm">
            <li className="flex items-start space-x-4 pt-4 border-t border-foreground/10">
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
            <div className="flex items-center justify-between border-t border-foreground/10 pt-4">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">
                {symbol}
                {total}
              </dd>
            </div>
          </dl>
        </div>
        <CoinbaseButton orderId={uuid} />
      </div>
      <p className="text-sm text-muted-foreground">Double-check your information before submitting to avoid any delays with your order.</p>
    </div>
  );
}

import CheckoutForm from "@/components/forms/checkout-form";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Progress } from "@/components/ui/progress";

async function getCheckoutData(uuid) {
  const checkoutData = await prisma.checkout.findUnique({
    where: { id: uuid },
    select: {
      id: true,
      title: true,
      status: true,
      currency: true,
    },
  });

  if (!checkoutData) {
    notFound();
  }
  return checkoutData;
}

export default async function CheckoutPage({ params }) {
  const checkoutData = await getCheckoutData(params.uuid);
  if (checkoutData.status === true) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[400px]">
      <h3 className="text-xl tracking-tight text-pretty line-clamp-2 text-ellipsis overflow-hidden">{checkoutData.title}</h3>
      <Progress value={50} />
      <CheckoutForm checkoutData={checkoutData} />
      <p className="text-sm text-muted-foreground">Clears instantly 24/7</p>
    </div>
  );
}

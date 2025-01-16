// if order with uuid order.payment == true redirect to confirmation page
// else redirect to payment / order.uuid
export default function confirmation() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[400px]">
      <h3 className="text-xl tracking-tight text-pretty line-clamp-2 text-ellipsis overflow-hidden">Order successful</h3>
    </div>
  );
}

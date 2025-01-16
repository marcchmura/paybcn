import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoader() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[400px]">
      <Skeleton className="h-5 w-full md:w-96" />
      <Skeleton className="h-12 w-full md:w-96" />
      <Skeleton className="h-48 w-full md:w-96" />
      <Skeleton className="h-8 w-full md:w-96" />
    </div>
  );
}

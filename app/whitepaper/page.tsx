import { Button } from "@/components/ui/button";
import Link from "next/link";

const timeline = [
  {
    name: "Product Hunt Launch",
    description: "Achieved 81 reviews with a perfect 5.0-star rating on Product Hunt, showcasing exceptional user satisfaction and trust.",
    date: "May 2024",
    dateTime: "2024-05",
  },
  {
    name: "Token 2049 Beta",
    description: "Partnered with cutting-edge developers and established Paybcn&apos;s base in Singapore, positioning it at the forefront of innovation.",
    date: "Sep 2024",
    dateTime: "2024-09",
  },
  {
    name: "Released Production",
    description: "Launched operations in Q1 2025 across 6 countries, expanding global reach.",
    date: "Jan 2025",
    dateTime: "2025-01",
  },
];

export default function referral() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-start space-y-6 flex-col w-full sm:w-[800px]">
      <h3 className="text-xl font-medium">Paybcn - Shop with crypto - 2025 Whitepaper</h3>
      <p className="text-sm/6">
        Paybcn is a cutting-edge platform designed to enable seamless cryptocurrency payments for e-commerce transactions. By addressing key pain points such as high fees, complex conversion processes, and limited merchant adoption, Paybcn empowers users to leverage their digital assets efficiently.
        This open-source project aims to drive mainstream adoption of cryptocurrencies in online shopping, prioritizing security, transparency, and usability.
      </p>
      <h4 className="text-lg">I. The market</h4>
      <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
        <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-muted p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
          <p className="flex-none text-2xl font-bold">$2.2 Trillion</p>
          <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p className="text-lg ">Total cryptocurrency market capitalization.</p>
            <p className="mt-2 text-sm/6 text-muted-foreground">The market has seen tremendous growth, reaching over $2 trillion in total value.</p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-foreground dark:bg-muted p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start">
          <p className="flex-none text-2xl font-bold text-white">$+100,000</p>
          <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p className="text-sm/6 text-white">Bitcoin ATH</p>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-primary dark:bg-muted p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
          <p className="flex-none text-2xl font-bold text-white">$7.1 Billion</p>
          <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
            <p className="text-lg text-white">Bitcoin&apos;s daily transaction volume.</p>
          </div>
        </div>
      </div>

      <p className="text-sm/6">
        (High Fees) Multiple layers of fees reduce user purchasing power. (Complexity) Tedious processes like card refills discourage everyday use. (Tax Implications) Conversion taxes inflate transaction and portfolio costs. (Limited Support) Most merchants lack crypto payment integration. These
        barriers prevent cryptocurrencies from being a viable payment option for the majority of users.
      </p>
      <p className="text-sm/6">Paybcn streamlines the online shopping experience by enabling direct cryptocurrency payments without complex conversions. Key features include:</p>
      <p className="text-sm/6">
        (Simplified Transactions) Paybcn offers a straightforward &quot;Pay with Crypto&quot; button for e-commerce platforms. (Hedging Mechanism) The platform ensures price stability during transactions, reducing user risk. (Seamless Integration) Paybcn integrates with popular e-commerce systems,
        making crypto adoption effortless for merchants. (Transparency and Security) As an open-source solution, Paybcn prioritizes user trust and collaboration.
      </p>

      <h4 className="text-lg">II. Upcoming features</h4>
      <p className="text-sm/6">
        Paybcn is enhancing its platform with innovative features, including a <span className="underline font-medium underline-offset-4 decoration-primary">native token</span> to streamline the checkout process and enable cashback and rewards programs that boost user engagement. It is also
        introducing an <span className="underline font-medium underline-offset-4 decoration-primary">order-tracking dashboard</span> to provide users with a centralized tool for managing cryptocurrency purchases, improving convenience and transparency. Additionally, we are
        <span className="underline font-medium underline-offset-4 decoration-primary">native token</span> to streamline the checkout process and enable cashback and rewards programs that boost user engagement. It is also introducing an
        <span className="underline font-medium underline-offset-4 decoration-primary">establishing partnerships</span> with merchants to offer discounts, making cryptocurrency payments more appealing to shoppers.
      </p>
      <h4 className="text-lg">III. About us</h4>
      <div className="mx-auto grid grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {timeline.map((item) => (
          <div key={item.name}>
            <time dateTime={item.dateTime} className="flex items-center text-sm/6 text-primary">
              <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
                <circle r={2} cx={2} cy={2} fill="currentColor" />
              </svg>
              {item.date}
              <div aria-hidden="true" className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" />
            </time>
            <p className="mt-6 text-primary text-sm/6 font-medium">{item.name}</p>
            <p className="mt-1 text-sm/6 ">{item.description}</p>
          </div>
        ))}
      </div>

      <p className="text-sm/6">We&apos;re a Singapore-based team of five, supported by a community of independent developers who actively contribute to Paybcn&apos;s growth on GitHub.</p>
      <Link href={"https://github.com/marcchmura/paybcn"}>
        <Button>Open on GitHub</Button>
      </Link>
    </div>
  );
}

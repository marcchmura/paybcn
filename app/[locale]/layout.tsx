import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from 'next-intl/server';


const inter = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop with Crypto | Paybcn",
  description: "Paybcn allows you to shop at your favorite stores and pay with 30+ cryptocurrencies. Enjoy secure, fast, and private transactions with no extra fees.",
  openGraph: {
    title: "Shop with Crypto | Paybcn",
    description: "Paybcn allows you to shop at your favorite stores and pay with 30+ cryptocurrencies. Enjoy secure, fast, and private transactions with no extra fees.",
    images: [
      {
        url: "/share.png",
        width: 1200,
        height: 630,
        alt: "Shop with Crypto | Paybcn",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });
 

  return (
    <html lang={locale} suppressHydrationWarning>
    <GoogleTagManager gtmId="G-E1RXVN16GP" />
    <NextIntlClientProvider locale={locale} messages={messages}>
      <body className={inter.className}>
        <div className="min-h-screen flex justify-between flex-col">
          <div className="flex flex-col">
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </NextIntlClientProvider>
  </html>
  );
}

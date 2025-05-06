import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GoogleTagManager } from '@next/third-parties/google'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="G-E1RXVN16GP" />
      <body className={inter.className}>
          <div className="min-h-screen flex justify-between flex-col">
            <div className="flex flex-col">
              <Header />
              {children}
            </div>

            <Footer />
          </div>
      </body>
    </html>
  );
}

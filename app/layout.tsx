import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Poppins({
  weight: "400",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Shop with Crypto as Easily as Cash | Paybcn",
  description: "Shop effortlessly with cryptocurrency using our secure and intuitive platform. Experience simplicity, privacy, and seamless transactions for all your shopping needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex justify-between flex-col">
            <div className="flex flex-col">
              <Header />
              {children}
            </div>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
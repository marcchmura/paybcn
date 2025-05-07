// app/[locale]/page.tsx
import { getTranslations } from "next-intl/server";
import ProductForm from "@/components/forms/product-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const t = await getTranslations();

  return (
    <div className="relative flex flex-col md:flex-row md:space-x-12 items-start justify-center px-6 lg:px-8 py-12 md:max-w-5xl mx-auto space-y-8">
      <div className="md:w-1/2 flex flex-col items-start justify-start space-y-12">
        <div className="relative z-10 mx-auto flex items-center space-y-10 md:space-y-12 flex-col">
          <div className="flex flex-col items-start justify-start md:items-start space-y-8 lg:space-y-8 ">
            <h3 className="text-5xl md:text-6xl tracking-tight text-pretty md:text-left break-words max-w-full">{t("HomePage.title")}</h3>
            <p className="sm:text-lg md:text-xl text-muted-foreground text-center md:text-left">{t("HomePage.body")}</p>
            <p className="sr-only">{t("HomePage.sr")}</p>
          </div>
          <div className=" space-x-4 items-start justify-start w-full hidden">
            <Link href={"https://www.tiktok.com/@marcchmura"}>
              <Button variant={"outline"}>
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-muted-foreground h-5" viewBox="0 0 32 32">
                  <path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z" />
                </svg>
              </Button>
            </Link>
            <Link href={"https://t.me/paybcnshop"}>
              <Button variant={"outline"}>
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-muted-foreground h-5" viewBox="0 0 24 24">
                  <path d="m12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12c0-6.627-5.373-12-12-12zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </Button>
            </Link>
          </div>
          <div className="relative w-full h-64 hidden md:block">
            <img src="/icon.svg" alt="Paybcn Logo Background" className="absolute inset-0  top-8 h-48 w-48 opacity-100 z-0 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="md:px-6 md:w-1/2 rounded-xl space-y-3 flex md:flex-col">
        <ProductForm />
      </div>
    </div>
  );
}

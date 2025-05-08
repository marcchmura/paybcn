"use client";
import { useState } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/logo";
import Link from "next/link";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("Header");

  const navigation = [
    { name: t("Home"), href: "/" },
    { name: t("Terms"), href: "https://fragrant-goal-701.notion.site/Terms-and-conditions-1ebb42f24926805098b1c5b3fffb8bb4?pvs=4" },
  ];

  return (
    <header className="bg-background">
      <nav aria-label="Global" className="mx-auto flex max-w-5xl items-center justify-between p-4 lg:px-8">
        <Link href={"/"} className="-m-1.5 p-1.5">
          <span className="sr-only">Paybcn</span>
          <Logo />
        </Link>
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground">
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6 font-medium items-center">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 hover:text-primary">
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog onClose={setMobileMenuOpen} className="lg:hidden">
          <Transition.Child as={Fragment} enter="transition-opacity ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 z-10 bg-black/20" />
          </Transition.Child>

          <Transition.Child as={Fragment} enter="transition ease-out duration-300 transform" enterFrom="translate-x-full opacity-0" enterTo="translate-x-0 opacity-100" leave="transition ease-in duration-200 transform" leaveFrom="translate-x-0 opacity-100" leaveTo="translate-x-full opacity-0">
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-muted/10">
              <div className="flex items-center justify-between">
                <Link href={"/"} className="-m-1.5 p-1.5">
                  <span className="sr-only">Paybcn</span>
                  <Logo />
                </Link>
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-muted-foreground">
                  <span className="sr-only">Close menu</span>
                  <X aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a key={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:bg-muted">
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger>
                        <p className="-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:bg-muted">{t("lang")}</p>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col space-y-2">
                        <Link key={"english"} href={"/en"}>
                          English
                        </Link>
                        <Link key={"french"} href={"/fr"}>
                          Français
                        </Link>
                        <Link key={"polish"} href={"/pl"}>
                          Polski
                        </Link>
                        <Link key={"russian"} href={"/ru"}>
                          Русский
                        </Link>
                        <Link key={"german"} href={"/de"}>
                          Deutsch
                        </Link>
                        <Link key={"dutch"} href={"/nl"}>
                          Nederlands
                        </Link>
                        <Link key={"chinese"} href={"/zh"}>
                          中文
                        </Link>
                        <Link key={"portuguese"} href={"/pt"}>
                          Português
                        </Link>
                        <Link key={"spanish"} href={"/es"}>
                          Español
                        </Link>
                        <Link key={"finnish"} href={"/fi"}>
                          Suomi
                        </Link>
                        <Link key={"swedish"} href={"/sv"}>
                          Svenska
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </DialogPanel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  );
}

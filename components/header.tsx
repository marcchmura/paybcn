"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "@/components/theme-switcher";
import Logo from "@/components/logo";
import Link from "next/link";

const navigation = [
  { name: "Referral", href: "/referral" },
  { name: "Whitepaper", href: "/whitepaper" },
  { name: "How To?", href: "/how-to" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background">
      <nav aria-label="Global" className="mx-auto flex max-w-5xl items-center justify-between p-6 lg:px-8">
        <Link href={"/"} className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Logo />
        </Link>
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground">
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 hover:text-primary">
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
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
            <div className="-my-6 ">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:bg-muted">
                    {item.name}
                  </a>
                ))}
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

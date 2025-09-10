"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SOCIAL_ICONS } from "@/lib/client-constants";
import { ROUTES } from "@/lib/constants";

import DownloadLinks from "../download-links";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";

import ScrollLink from "./scroll-link";

type MobileMenuProps = {
  open: boolean;
  close: VoidFunction;
};

function MobileMenu({ open, close }: MobileMenuProps) {
  const [isMobile, setIsMobile] = useState(false);
  const linkStyles =
    "whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-white";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetTitle className="sr-only">Menu</SheetTitle>
      <SheetContent
        side={isMobile ? "right" : "top"}
        className="max-sm:w-screen [&_svg]:w-6 [&_svg]:h-6 [&_button]:focus:ring-softGrey max-sm:border-none border-primary pt-[10vh] sm:pt-12 px-8 pb-8 bg-background"
      >
        <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
          <ul className="w-full h-fit text-right sm:text-left max-sm:space-y-5 text-2xl flex max-sm:flex-col flex-row sm:gap-6 sm:items-center sm:justify-center flex-wrap">
            {ROUTES.map((route) => {
              const isHomePath = route.path === "home";
              const redirectPath = route.path === "about-me" || isHomePath
              return (
                <li key={route.path}>
                  {redirectPath ? (
                    <Link
                      href={isHomePath ? "/" : route.path}
                      onClick={close}
                      className={linkStyles}
                    >
                      {route.label}
                    </Link>
                  ) : (
                    <ScrollLink
                      id={route.path}
                      className={linkStyles}
                      onClick={close}
                    >
                      {route.label}
                    </ScrollLink>
                  )}
                </li>
              )
            })}
            <li>
              <Link href="/app/contact" className={linkStyles}>
                Contact
              </Link>
            </li>
            <li>
              <div className="max-sm:border-b sm:border-r sm:h-8 border-solid border-primary" />
            </li>
            {SOCIAL_ICONS.map((socialIcon) => (
              <li key={socialIcon.value}>
                <Link href={socialIcon.href || "#"} target="_blank" className={linkStyles}>
                  {socialIcon.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-6 w-full h-full items-end justify-center sm:pt-16">
            <h2 className="text-2xl sm:hidden">Downloads</h2>
            <DownloadLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;

"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

import Burger from "@/icons/burger";
import { SOCIAL_ICONS } from "@/lib/client-constants";
import { ROUTES } from "@/lib/constants";
import { UserSession } from "@/lib/types";
import { cn } from "@/lib/utils";

import Logo from "./primitives/logo";
import MenuLink from "./primitives/menu-link";
import MobileMenu from "./primitives/mobile-menu";
import ScrollLink from "./primitives/scroll-link";
import UserMainBar from "./user-main-bar";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

type MobileMenuButtonProps = {
  open: VoidFunction;
};

type NavbarProps = {
  session: UserSession;
};

function NavLink({ href, className, children }: NavLinkProps) {
  //TODO: routing for active links
  const linkClassName = cn(
    "text-lg hover:text-white transition-colors duration-300 ease-in-out",
    className
  );
  return (
    <li>
      {!href.includes("about-me") ? (
        <ScrollLink id={href} className={linkClassName}>
          {children}
        </ScrollLink>
      ) : (
        <Link href={href} className={linkClassName}>
          {children}
        </Link>
      )}
    </li>
  );
}

function NavLinks() {
  return ROUTES.map((route, index) =>
    index !== ROUTES.length - 1 ? (
      <NavLink href={route.path} key={route.path}>
        {route.label}
      </NavLink>
    ) : null
  );
}

function SocialNavLinks() {
  return (
    <li className="flex items-center gap-1.5">
      {SOCIAL_ICONS.map((socialIcon, index) => (
        <Link
          key={`${index}-${socialIcon.href}`}
          href={socialIcon.href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center bg-softGrey border border-solid border-whiteText rounded-full h-[42px] w-[42px] transition duration-300 ease-in hover:border-background"
        >
          <span className="absolute inset-0 bg-primary rounded-full transform scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100" />
          <socialIcon.icon />
        </Link>
      ))}
    </li>
  );
}

function LetsConnectLink() {
  return (
    <li className="max-600:hidden">
      <Link
        href="/app/contact"
        className="group relative rounded-sm border border-solid border-whiteText text-lg font-semibold py-[18px] px-[34px] transition duration-300 ease-in hover:border-background overflow-hidden"
      >
        <span className="absolute rounded-sm inset-0 bg-primary transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
        <span className="relative z-10 transition-colors group-hover:text-darkGrey">
          Let&apos;s Connect
        </span>
      </Link>
    </li >
  );
}

function MobileMenuButton({ open }: MobileMenuButtonProps) {
  return (
    <li className="1100:hidden flex items-center">
      <button
        type="button"
        title="mobileMenuButton"
        onClick={open}
        className="group relative p-[18px] border border-solid border-whiteText transition duration-300 ease-in overflow-hidden"
      >
        <span className="absolute inset-0 bg-white transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
        <Burger className="relative z-10 transition-colors group-hover:stroke-darkGrey" />
      </button>
    </li>
  );
}

export default function Navbar({ session }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const ulStyles = "flex items-center gap-10 text-whiteText";

  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out",
          scrolled ? "bg-background py-5" : "bg-transparent py-8"
        )}
      >
        <UserMainBar session={session} />
        <div className="flex items-center justify-between w-full max-w-fa mx-auto px-4 mt-6">
          <div className="flex items-center gap-8 w-fit">
            <Logo />
            <ul className={cn(ulStyles, "max-1100:hidden")}>
              <NavLinks />
              <li>
                <MenuLink
                  name="Downloads"
                  linkStyles="font-normal bg-transparent p-0 h-fit [&_svg]:w-4 [&_svg]:h-4 text-lg hover:text-white transition-colors duration-300 ease-in-out"
                />
              </li>
            </ul>
          </div>

          <div className="w-fit">
            <ul className={cn(ulStyles, "gap-6")}>
              <NavLink href="/app/about-me" className="ml-10 max-830:hidden">
                About me
              </NavLink>
              <SocialNavLinks />
              <LetsConnectLink />
              <MobileMenuButton open={handleOpenMenu} />
            </ul>
          </div>
        </div>
      </nav>
      <MobileMenu open={openMenu} close={handleCloseMenu} />
    </>
  );
}

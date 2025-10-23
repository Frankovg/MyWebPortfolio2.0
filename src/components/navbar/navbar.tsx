"use client";

import { useEffect, useState } from "react";

import { UserSession } from "@/lib/types";
import { cn } from "@/lib/utils";

import Logo from "../primitives/logo";
import MenuLink from "../primitives/menu-link";
import MobileMenu from "../primitives/mobile-menu";


import { LetsConnectLink } from "./components/lets-connect-link";
import { MobileMenuButton } from "./components/mobile-menu-button";
import { NavLink } from "./components/nav-link";
import { NavLinks } from "./components/nav-links";
import { SocialNavLinks } from "./components/social-nav-links";
import UserMainBar from "./components/user-main-bar";

type NavbarProps = {
  session: UserSession;
};

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
        <div className="flex items-center justify-between w-full max-w-fa mx-auto px-4 mt-8 1100:mt-6">
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
              <NavLink href="/about-me" className="ml-10 max-830:hidden">
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

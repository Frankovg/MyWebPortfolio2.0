'use client'

import Link from "next/link"

//Components
import Logo from "./logo"
import MenuLink from "./menu-link"
import MobileMenu from "./mobile-menu"
import Burguer from "@/icons/burguer"
import ScrollLink from "./scroll-link"

//Utils
import { cn } from "@/lib/utils"

//Types
import { ReactNode, useEffect, useState } from "react"

//Constants
import { ROUTES } from "@/lib/constants"
import { SOCIAL_ICONS } from "@/lib/client-constants"

type NavLinkProps = {
  href: string,
  children: ReactNode,
  className?: string,
}

function NavLink({ href, className, children }: NavLinkProps) {
  //TODO: routing for active links
  return (
    <li>
      {!href.includes('about-me') ? (
        <ScrollLink id={href} className={cn("text-lg hover:text-white transition-colors duration-300 ease-in-out", className)} >
          {children}
        </ScrollLink>
      ) : (
        <Link href={href} className={cn("text-lg hover:text-white transition-colors duration-300 ease-in-out", className)} >
          {children}
        </Link>
      )}
    </li>
  )
}

function NavLinks() {
  const links = ROUTES.map((route, index) => {
    if (index !== ROUTES.length - 1) {
      return (
        <NavLink href={route.path} key={route.path}>
          {route.label}
        </NavLink>
      )
    }
  })
  return links
}

function SocialNavLinks() {
  const socialLinks = SOCIAL_ICONS.map((socialIcon, index) => (
    <Link
      key={`${index}-${socialIcon.href}`}
      href={socialIcon.href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center bg-softGrey border border-solid border-whiteText rounded-full h-[42px] w-[42px] transition duration-300 ease-in hover:border-background"
    >
      <span className="absolute inset-0 bg-primary rounded-full transform scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100" />
      <socialIcon.icon />
    </Link>
  ))
  return <li className="flex items-center gap-1.5">{socialLinks}</li>
}

function LetsConnectLink() {
  return (
    <li className="max-600:hidden">
      <ScrollLink
        id='contact'
        className="group relative rounded border border-solid border-whiteText text-lg font-semibold py-[18px] px-[34px] transition duration-300 ease-in hover:border-background overflow-hidden"
      >
        <span className="absolute rounded inset-0 bg-primary transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
        <span className="relative z-10 transition-colors group-hover:text-darkGrey">
          Let&apos;s Connect
        </span>
      </ScrollLink>
    </li>
  )
}

type MobileMenuButtonProps = {
  open: VoidFunction
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
        <Burguer className="relative z-10 transition-colors group-hover:stroke-darkGrey" />
      </button>
    </li>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true)
  }

  const handleCloseMenu = () => {
    setOpenMenu(false)
  }

  const ulStyles = 'flex items-center gap-10 text-whiteText'

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-background py-5' : 'bg-transparent py-8'}`}>
        <div className="flex items-center justify-between w-full max-w-fa mx-auto px-4">
          <div className="flex items-center gap-8 w-fit">
            <Logo />
            <ul className={cn(ulStyles, 'max-1100:hidden')}>
              <NavLinks />
              <li>
                <MenuLink
                  name="Downloads"
                  linkStyles='font-normal bg-transparent p-0 h-fit [&_svg]:w-4 [&_svg]:h-4 text-lg hover:text-white transition-colors duration-300 ease-in-out'
                />
              </li>
            </ul>
          </div>

          <div className="w-fit">
            <ul className={cn(ulStyles, 'gap-6')}>
              <NavLink href='about-me' className="ml-10 max-830:hidden">About me</NavLink>
              <SocialNavLinks />
              <LetsConnectLink />
              <MobileMenuButton open={handleOpenMenu} />
            </ul>
          </div>
        </div>
      </nav>
      <MobileMenu open={openMenu} close={handleCloseMenu} />
    </>
  )
}
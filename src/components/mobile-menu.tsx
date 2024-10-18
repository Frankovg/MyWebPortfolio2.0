'use client'

import { useMediaQuery } from "usehooks-ts"
import { Sheet, SheetContent } from "./ui/sheet"
import Link from "next/link"
import { ROUTES } from "@/lib/constants"
import DownloadLinks from "./download-links"
import { useUserDataContext } from "@/hooks/useUserDataContext"

type MobileMenuProps = {
  open: boolean,
  close: VoidFunction
}

function MobileMenu({ open, close }: MobileMenuProps) {
  const { socials } = useUserDataContext()

  const isMobile = useMediaQuery("(max-width: 640px)")
  const linkStyles = "whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-white"

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side={isMobile ? 'right' : 'top'} className="max-[640px]:w-screen [&_svg]:w-6 [&_svg]:h-6 focus:[&_button]:ring-softGrey max-[640px]:border-none border-primary pt-[10vh] min-[640px]:pt-12 px-8 pb-8 bg-background">
        <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
          <ul className="w-full h-fit text-right min-[640px]:text-left max-[640px]:space-y-5 text-2xl flex max-[640px]:flex-col flex-row min-[640px]:gap-6 min-[640px]:items-center min-[640px]:justify-center flex-wrap">
            {ROUTES.map((route) => (
              <li key={route.path}>
                <Link href={route.path} onClick={close} className={linkStyles}>
                  {route.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href='/#contact' className={linkStyles}>Contact</Link>
            </li>
            <li>
              <div className="max-[640px]:border-b min-[640px]:border-r min-[640px]:h-8 border-solid border-primary" />
            </li>
            {socials.map((socialIcon) => (
              <li key={socialIcon.href}>
                <Link href={socialIcon.href || '#'} className={linkStyles}>
                  {socialIcon.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col min-[640px]:flex-row gap-6 w-full h-full items-end justify-center min-[640px]:pt-16">
            <h2 className="text-2xl min-[640px]:hidden">Downloads</h2>
            <DownloadLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
'use client'

import { useMediaQuery } from "usehooks-ts"
import { Sheet, SheetContent } from "./ui/sheet"
import Link from "next/link"
import { ROUTES, SOCIAL } from "@/lib/constants"
import DownloadLinks from "./download-links"

type MobileMenuProps = {
  open: boolean,
  close: VoidFunction
}

function MobileMenu({ open, close }: MobileMenuProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const linkStyles = "transition-colors duration-300 ease-in-out hover:text-white"

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side={isMobile ? 'right' : 'top'} className="max-[550px]:w-screen [&_svg]:w-6 [&_svg]:h-6 focus:[&_button]:ring-softGrey max-[550px]:border-none border-primary pt-[10vh] min-[550px]:pt-12 px-8 pb-8 bg-background">
        <div className="w-full h-full overflow-y-auto flex flex-col justify-between">
          <ul className="w-full h-fit text-right min-[550px]:text-left max-[550px]:space-y-5 text-2xl flex max-[550px]:flex-col flex-row min-[550px]:gap-6 min-[550px]:items-center min-[550px]:justify-center flex-grow">
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
            <li><div className="max-[550px]:border-b min-[550px]:border-r min-[550px]:h-8 border-solid border-primary" /></li>
            {SOCIAL.map((socialIcon) => (
              <li key={socialIcon.href}>
                <Link href={socialIcon.href} className={linkStyles}>
                  {socialIcon.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col min-[550px]:flex-row gap-6 w-full h-full items-end justify-center min-[550px]:pt-16">
            <h2 className="text-2xl min-[550px]:hidden">Downloads</h2>
            <DownloadLinks />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu
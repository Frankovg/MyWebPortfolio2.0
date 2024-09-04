import { DOWNLOADS } from "@/lib/constants"
import Logo from "./logo"
import Link from "next/link"
import Prefooter from "./prefooter"

const footerLinks = {
  sections: [
    {
      title: 'Sections'
    },
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Tech Stack',
      href: '/#tech-stack'
    },
    {
      name: 'Projects',
      href: '/projects'
    }
  ],
  downloads: [
    {
      title: 'Downloads'
    },
    {
      name: 'Curriculum Vitae',
      href: DOWNLOADS[0].href
    },
    {
      name: 'Portfolio',
      href: DOWNLOADS[1].href
    }
  ],
  letsTalk: [
    {
      title: "Let's Talk"
    },
    {
      name: 'About',
      href: '/about-me'
    },
    {
      name: 'Contact',
      href: '/contact'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/francoamoroso/'
    }
  ]
}

type TItem = {
  name?: string,
  href?: string
  title?: string,
}

const Li = ({ index, item }: { index: number, item: TItem }) => (
  <li className="max-sm:text-center">
    {index === 0 && 'title' in item ? (
      <h6 className="font-medium underline mb-1.5 max-sm:text-xl text-base">{item.title || ''}</h6>
    ) : (
      <Link href={item.href || '#'} className="font-normal hover:text-white max-sm:text-lg" >
        {item.name || ''}
      </Link>
    )}
  </li>
)


function Footer() {
  return (
    <>
      <Prefooter />
      <footer className="w-full h-auto bg-background py-12 pb-12">
        <div className="w-full flex flex-col sm:grid grid-cols-12 grid-flow-row gap-0 max-w-[1320px] mx-auto px-4 max-sm:space-y-8">
          <div className="max-sm:mx-auto col-span-2 scale-90">
            <Logo />
          </div>

          <ul className="max-sm:mx-auto col-start-4 col-span-2 row-start-1 row-span-1 space-y-2">
            {footerLinks.sections.map((section, index) => (
              <Li index={index} item={section} key={index} />
            ))}
          </ul>

          <ul className="max-sm:mx-auto col-start-7 col-span-2 row-start-1 row-span-1 space-y-2">
            {footerLinks.downloads.map((download, index) => (
              <Li index={index} item={download} key={index} />
            ))}
          </ul>

          <ul className="max-sm:mx-auto col-start-10 col-span-2 row-start-1 row-span-1 space-y-2">
            {footerLinks.letsTalk.map((more, index) => (
              <Li index={index} item={more} key={index} />
            ))}
          </ul>

          <div className="row-start-2 row-span-1 col-span-12 text-center pb-2 pt-16">
            <p className="w-full">This is a React App designed and developed by Franco Gabriel Amoroso.</p>
          </div>
          <div className="row-start-3 row-span-1 col-start-5 col-span-4 text-center sm:space-y-1.5">
            <p className="w-full text-xs">Copyright © 2024 Franco Gabriel Amoroso. All rights reserved.</p>
          </div>

        </div>
        <div className="sm:absolute right-4 bottom-2.5">
          <p className="text-center w-full text-xs">Last update: November 2024 | Version: 1.0.0</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
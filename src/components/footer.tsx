import Link from "next/link";

import { FOOTER_LINKS } from "@/lib/constants";

import packageJson from "../../package.json";

import DownloadLinksFooter from "./download-links-footer";
import Prefooter from "./prefooter";
import Logo from "./primitives/logo";

function Footer() {
  const year = new Date().getFullYear();
  const linkStyles = 'font-normal hover:text-white max-sm:text-lg'

  return (
    <>
      <Prefooter />
      <footer className="w-full h-auto bg-background py-12 pb-12">
        <div className="w-full flex flex-col sm:grid grid-cols-12 grid-flow-row gap-0 max-w-fa mx-auto px-4 max-sm:space-y-8">
          <div className="max-sm:mx-auto col-span-2 scale-90 w-fit">
            <Logo />
          </div>

          <ul className="max-sm:mx-auto col-start-4 col-span-2 row-start-1 row-span-1 space-y-2">
            <li>
              <h6 className="max-sm:text-center font-medium  mb-1.5 max-sm:text-xl text-base">
                Sections
              </h6>
            </li>
            {FOOTER_LINKS.sections.map((section, index) => (
              <li className="max-sm:text-center" key={index}>
                <Link
                  href={section.href || "#"}
                  className={linkStyles}
                >
                  {section.name || ""}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="max-sm:mx-auto col-start-6 col-span-2 row-start-1 row-span-1 space-y-2">
            <li>
              <h6 className="max-sm:text-center font-medium  mb-1.5 max-sm:text-xl text-base">
                Downloads
              </h6>
            </li>
            <DownloadLinksFooter />
          </ul>

          <ul className="max-sm:mx-auto col-start-9 col-span-2 row-start-1 row-span-1 space-y-2">
            <li>
              <h6 className="max-sm:text-center font-medium  mb-1.5 max-sm:text-xl text-base">
                Let&apos;s Talk
              </h6>
            </li>
            {FOOTER_LINKS.letsTalk.map((item, index) => {
              const linkText = item.name || ""
              const linkHref = item.href || "#"
              return (
                <li className="max-sm:text-center" key={index}>
                  {item.name.includes('LinkedIn') ? (
                    <a href={linkHref} className={linkStyles} >{linkText}</a>
                  ) : (
                    <Link href={linkHref} className={linkStyles} >{linkText}</Link>
                  )}
                </li>
              )
            })}
          </ul>

          <ul className="max-sm:mx-auto col-start-11 col-span-2 row-start-1 row-span-1 space-y-2">
            <li>
              <h6 className="max-sm:text-center font-medium  mb-1.5 max-sm:text-xl text-base">
                Legals
              </h6>
            </li>
            {FOOTER_LINKS.legals.map((item, index) => (
              <li className="max-sm:text-center" key={index}>
                <Link
                  href={item.href || "#"}
                  className={linkStyles}
                >
                  {item.name || ""}
                </Link>
              </li>
            ))}
          </ul>

          <div className="row-start-2 row-span-1 col-span-12 text-center pb-2 pt-24">
            <p className="w-full">
              This is a React Next.js App designed and developed by Franco
              Gabriel Amoroso.
            </p>
          </div>
          <div className="row-start-3 row-span-1 col-start-5 col-span-4 text-center sm:space-y-1.5">
            <p className="w-full text-xs">
              Copyright © {year} Franco Gabriel Amoroso.
            </p>
          </div>
        </div>
        <div className="sm:absolute right-4 bottom-2.5">
          <p className="text-center w-full text-xs">
            Last update: January 2026 | Version: {packageJson.version}
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

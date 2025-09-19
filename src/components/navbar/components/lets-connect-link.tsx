'use client'
import Link from "next/link";

export function LetsConnectLink() {
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

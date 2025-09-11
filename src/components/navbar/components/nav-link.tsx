import Link from "next/link";
import { ReactNode } from "react";

import ScrollLink from "@/components/primitives/scroll-link";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function NavLink({ href, className, children }: NavLinkProps) {
  const linkClassName = cn(
    "text-lg hover:text-white transition-colors duration-300 ease-in-out",
    className
  );

  const isAboutMePage = href === "/app/about-me";

  return (
    <li>
      {!isAboutMePage ? (
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

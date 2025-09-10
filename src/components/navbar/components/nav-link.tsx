import { Link } from "lucide-react";
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

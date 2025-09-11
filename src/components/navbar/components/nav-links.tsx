'use client'

import { ROUTES } from "@/lib/client-constants";

import { NavLink } from "./nav-link";

export function NavLinks() {
  return ROUTES.map((route, index) =>
    index !== ROUTES.length - 1 ? (
      <NavLink href={route.path} key={route.path}>
        {route.label}
      </NavLink>
    ) : null
  );
}

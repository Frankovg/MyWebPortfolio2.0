'use client'

import Link from "next/link";
import { useTransition } from "react";

import { logOut } from "@/actions/user-actions";
import LanguageSelector from "@/components/language-selector";
import Overlay from "@/components/primitives/overlay";

const LanguageSelectorContainer = () => {
  return (
    <>
      <LanguageSelector />
      <span>|</span>
    </>
  );
};

type UserMainBarContentProps = {
  isLogged: boolean;
  isAdmin: boolean;
};

export const UserMainBarContent = ({ isLogged, isAdmin }: UserMainBarContentProps) => {
  const [isPending, startTransition] = useTransition();

  const hoverStyle = "hover:underline";
  const wrapperStyle = "space-x-2.5 flex";

  if (!isLogged) {
    return (
      <div className={wrapperStyle}>
        <LanguageSelectorContainer />
        <Link href="/login" className={hoverStyle}>
          <span>Login</span>
        </Link>
      </div>
    );
  }

  const message = isAdmin
    ? "Welcome back! You have admin access."
    : "Welcome! This is a demo account with restricted access.";
  const mobileMessage = isAdmin ? "Admin access." : "Demo account";

  return (
    <>
      {isPending && <Overlay message="Good Bye!" />}
      <p
        data-mobile={mobileMessage}
        data-desktop={message}
        className="before:content-[attr(data-mobile)] md:before:content-none md:before:hidden md:after:content-[attr(data-desktop)] before:block after:hidden md:after:block"
      />
      <div className={wrapperStyle}>
        <LanguageSelectorContainer />
        <Link href="/admin" className={hoverStyle}>
          <span>Admin</span>
        </Link>
        <button
          className={hoverStyle}
          onClick={async () => {
            startTransition(async () => {
              await logOut();
            });
          }}
        >
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

"use client";

import { UserSession } from "@/lib/types";
import { cn } from "@/lib/utils";

import { UserMainBarContent } from "./user-main-bar-content";

type UserMainBarProps = {
  session: UserSession;
};

function UserMainBar({ session }: UserMainBarProps) {
  const user = session?.user;

  const isLogged = !!user;
  const isAdmin = user?.isAdmin ?? false;
  const styles = isLogged
    ? "bg-primary text-darkPrimary"
    : "bg-transparent text-whiteText";

  return (
    <div
      className={cn(
        "absolute top-0 w-screen h-6 z-50 flex items-center",
        styles
      )}
    >
      <div
        className={cn(
          "flex items-center w-full max-w-fa mx-auto pl-4 pr-6",
          isLogged ? "justify-between" : "justify-end"
        )}
      >
        <UserMainBarContent isLogged={isLogged} isAdmin={isAdmin} />
      </div>
    </div>
  );
}

export default UserMainBar;

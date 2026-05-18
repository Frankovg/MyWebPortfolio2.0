"use client";

import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { UserMainBarContent } from "./user-main-bar-content";

function UserMainBar() {
  const { data: session } = useSession();
  const user = session?.user;

  const isLogged = !!user;
  const isAdmin = (user as { isAdmin?: boolean } | undefined)?.isAdmin ?? false;

  const styles = isLogged
    ? "bg-primary text-darkPrimary"
    : "bg-transparent text-whiteText";

  return (
    <div
      className={cn(
        "absolute top-0 w-screen min-h-6 z-50 flex items-center py-3 1100:py-0 1100:mb-0",
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

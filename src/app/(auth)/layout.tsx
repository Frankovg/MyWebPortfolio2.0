import React from "react";

import Logo from "@/components/primitives/logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex flex-col gap-y-10 justify-center items-center min-h-screen">
      <Logo />
      {children}
    </main>
  );
};

export default Layout;

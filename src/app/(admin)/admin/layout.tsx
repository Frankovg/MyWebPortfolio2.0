import React from "react";

import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { checkAuth } from "@/lib/server-utils-admin";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await checkAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

import React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectContextProvider from "@/context/project-provider";
import { getCategoriesAdmin } from "@/lib/server-utils-admin";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategoriesAdmin();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ProjectContextProvider data={categories}>
          {children}
        </ProjectContextProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;

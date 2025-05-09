import React from "react";

import ProjectContextProvider from "@/context/project-provider";
import { getCategoriesAdmin } from "@/lib/server-utils-admin";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategoriesAdmin();
  return (
    <ProjectContextProvider data={categories}>
      {children}
    </ProjectContextProvider>
  );
};

export default Layout;

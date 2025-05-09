import React from "react";

import ProjectContextProvider from "@/context/project-provider";
import { getCategoriesAdmin } from "@/lib/server-utils-admin";
import { ProjectFormProvider } from "@/context/project-form-provider";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategoriesAdmin();
  return (
    <ProjectContextProvider data={categories}>
      <ProjectFormProvider>{children}</ProjectFormProvider>
    </ProjectContextProvider>
  );
};

export default Layout;

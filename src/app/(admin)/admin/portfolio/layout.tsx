import React from "react";

import { getCategoriesAdmin } from "@/lib/server-utils-admin";

import { ProjectStoreInitializer } from "./components/project-store-initializer";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategoriesAdmin();
  return (
    <>
      <ProjectStoreInitializer data={categories} />
      {children}
    </>
  );
};

export default Layout;

import { Suspense } from "react";

import AdminSection from "@/components/admin-section";
import H1Main from "@/components/h1-main";
import { getCategoriesAdmin } from "@/lib/server-utils-admin";

import MainHeader from "../components/main-header";

import PortfolioExplorer from "./components/portfolio-explorer";
import Loading from "./loading";
import { checkAuth } from "@/lib/check-auth";

async function Admin() {
  const breadcrumbLinks = [
    {
      name: "Portfolio",
    },
  ];

  const session = await checkAuth();

  const categories = await getCategoriesAdmin();

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <H1Main>Portfolio</H1Main>
          <PortfolioExplorer
            categories={categories}
            isAdmin={session?.user.isAdmin}
          />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Admin;

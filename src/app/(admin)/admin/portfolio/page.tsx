import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import MainHeader from "@/components/admin/main-header";
import AdminSection from "@/components/admin-section";
import { checkAuth } from "@/lib/check-auth";
import { getCategoriesAdmin } from "@/lib/server-utils-admin";

import PortfolioExplorer from "./components/portfolio-explorer";
import Loading from "./loading";

async function Portfolio() {
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
          <AdminPageTitle title="Portfolio" />
          <PortfolioExplorer
            categories={categories}
            isAdmin={session?.user.isAdmin}
          />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Portfolio;

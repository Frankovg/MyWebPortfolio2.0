import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";

import PortfolioExplorer from "./components/portfolio-explorer";
import Loading from "./loading";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function Portfolio({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category as string;

  const breadcrumbLinks = [
    {
      name: "Portfolio",
    },
  ];

  const session = await checkAuth();

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Portfolio" />
          <PortfolioExplorer
            isAdmin={session?.user.isAdmin}
            defaultCategory={category || "web-development"}
          />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Portfolio;

import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";
import { getDownloadsContent } from "@/lib/server-utils-admin";

import Loading from "./loading";
import DownloadsTable from "./components/downloads-table";
import DownloadProvider from "@/context/download-provider";

async function Downloads() {
  const breadcrumbLinks = [
    {
      name: "Downloads",
    },
  ];

  const session = await checkAuth();

  const downloads = await getDownloadsContent();

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="User Management" />
          <DownloadProvider data={downloads}>
            <DownloadsTable isAdmin={session?.user.isAdmin} />
          </DownloadProvider>
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Downloads;

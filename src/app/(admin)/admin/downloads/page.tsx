import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";

import { AddFileButton } from "./components/add-file-button";
import DownloadsTable from "./components/downloads-table";
import Loading from "./loading";

async function Downloads() {
  const breadcrumbLinks = [
    {
      name: "Downloads",
    },
  ];

  const session = await checkAuth();

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <div className="w-full flex items-start justify-between">
            <AdminPageTitle title="Downloads" />
            <AddFileButton />
          </div>
          <DownloadsTable isAdmin={session?.user.isAdmin} />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Downloads;

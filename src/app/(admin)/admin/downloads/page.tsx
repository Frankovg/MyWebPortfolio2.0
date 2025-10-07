import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";

import { AddFileButton } from "./components/add-file-button";
import DownloadsTable from "./components/downloads-table";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

async function Downloads() {
  const breadcrumbLinks = [
    {
      name: "Downloads",
    },
  ];

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <div className="w-full flex items-start justify-between">
            <AdminPageTitle title="Downloads" />
            <AddFileButton />
          </div>
          <DownloadsTable />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Downloads;

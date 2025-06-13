import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import { DownloadsForm } from "@/components/admin/downloads-form";
import MainHeader from "@/components/admin/main-header";

import Loading from "./loading";

async function AddFile() {
  const breadcrumbLinks = [
    {
      name: "Downloads",
      href: "/admin/downloads",
    },
    {
      name: "Add File",
    },
  ];

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Add File" showGoBack={true} />
          <DownloadsForm actionType="add" />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default AddFile;

import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import { DownloadsForm } from "@/components/admin/downloads-form";
import MainHeader from "@/components/admin/main-header";
import { getDownloadFileById } from "@/lib/server-utils-admin";

import Loading from "./loading";
import NotFound from "./not-found";

async function EditDownload({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const breadcrumbLinks = [
    {
      name: "Downloads",
      href: "/admin/downloads",
    },
    {
      name: "Edit Download",
    },
  ];

  const file = await getDownloadFileById(id);

  if (!file) {
    return <NotFound />;
  }

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Edit Download" showGoBack={true} />
          <DownloadsForm actionType="edit" download={file} />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default EditDownload;

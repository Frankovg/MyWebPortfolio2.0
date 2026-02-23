import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";

import MediaLibraryClient from "./components/media-library-client";
import Loading from "./loading";

export const dynamic = "force-dynamic";

const title = "Media Library";

const breadcrumbLinks = [{ name: title }];

export default function MediaLibraryPage() {
  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title={title} />
          <MediaLibraryClient />
        </AdminSection>
      </Suspense>
    </>
  );
}

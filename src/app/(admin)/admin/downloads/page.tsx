import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import Loading from "./loading";
import DownloadsTable from "./components/downloads-table";

async function Downloads() {
  const breadcrumbLinks = [
    {
      name: "Downloads",
    },
  ];

  const session = await checkAuth();

  const users = await getUsersAdmin();
  // TODO: add provider
  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="User Management" />
          {/* <UserManagementProvider data={users}> */}
          <DownloadsTable isAdmin={session?.user.isAdmin} />
          {/* </UserManagementProvider> */}
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Downloads;

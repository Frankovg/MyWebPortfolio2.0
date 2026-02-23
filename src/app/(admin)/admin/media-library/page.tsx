import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import Loading from "./loading";

export const dynamic = 'force-dynamic';

async function UserManagement() {
  const title = "Media Library"

  const breadcrumbLinks = [
    {
      name: title,
    },
  ];

  const users = await getUsersAdmin();

  if (!users) throw new Error("Error fetching users.")

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title={title} />

        </AdminSection>
      </Suspense>
    </>
  );
}

export default UserManagement;

import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import UserManagementProvider from "@/context/user-management-provider";
import { checkAuth } from "@/lib/check-auth";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import Loading from "./loading";

async function ChangePassword() {
  const breadcrumbLinks = [
    {
      name: "User Management",
    },
  ];

  const session = await checkAuth();

  const users = await getUsersAdmin();

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Change password" />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default ChangePassword;

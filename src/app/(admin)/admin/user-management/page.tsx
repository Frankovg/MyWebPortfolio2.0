import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import AccountsTable from "./components/accounts-table";
import Loading from "./loading";
import UserManagementProvider from "@/context/user-management-provider";

async function UserManagement() {
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
          <AdminPageTitle title="User Management" />
          <UserManagementProvider data={users}>
            <AccountsTable isAdmin={session?.user.isAdmin} />
          </UserManagementProvider>
        </AdminSection>
      </Suspense>
    </>
  );
}

export default UserManagement;

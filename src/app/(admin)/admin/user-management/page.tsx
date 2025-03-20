import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/components/admin-page-title";
import MainHeader from "@/components/admin/components/main-header";
import AdminSection from "@/components/admin-section";
import { checkAuth } from "@/lib/check-auth";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import AccountsTable from "./components/accounts-table";
import UserManagementProvider from "./context/user-management-provider";
import Loading from "./loading";

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

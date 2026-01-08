import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { UserManagementInitializer } from "@/components/admin/user-management/user-management-initializer";
import { checkAuth } from "@/lib/check-auth";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import AccountsTable from "./components/accounts-table";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

async function UserManagement() {
  const breadcrumbLinks = [
    {
      name: "User Management",
    },
  ];

  const session = await checkAuth();

  const users = await getUsersAdmin();

  if (!users) throw new Error("Error fetching users.")

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="User Management" />
          <UserManagementInitializer users={users}>
            <AccountsTable isAdmin={session?.user.isAdmin ?? false} />
          </UserManagementInitializer>
        </AdminSection>
      </Suspense>
    </>
  );
}

export default UserManagement;

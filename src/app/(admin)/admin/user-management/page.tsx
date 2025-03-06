import { Suspense } from "react";

import AdminSection from "@/components/admin-section";
import H1Main from "@/components/h1-main";
import { checkAuth } from "@/lib/check-auth";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import MainHeader from "../components/main-header";

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
          <H1Main>User Management</H1Main>
          <UserManagementProvider data={users}>
            <AccountsTable isAdmin={session?.user.isAdmin} />
          </UserManagementProvider>
        </AdminSection>
      </Suspense>
    </>
  );
}

export default UserManagement;

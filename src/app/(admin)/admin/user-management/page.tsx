import { Suspense } from "react";

import { checkAuth } from "@/lib/check-auth";
import { getUsers } from "@/lib/server-utils";

import MainHeader from "../components/main-header";

import AccountsTable from "./components/accounts-table";
import UserManagementProvider from "./context/user-management-provider";
import Loading from "./loading";
import H1Main from "@/components/h1-main";

async function UserManagement() {
  const breadcrumbLinks = [
    {
      name: "User Management",
    },
  ];

  const session = await checkAuth();

  const users = await getUsers();

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <section className="w-full px-20 py-10 space-y-6">
          <H1Main>User Management</H1Main>
          <UserManagementProvider data={users}>
            <AccountsTable isAdmin={session?.user.isAdmin} />
          </UserManagementProvider>
        </section>
      </Suspense>
    </>
  );
}

export default UserManagement;

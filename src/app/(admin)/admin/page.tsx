import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";

import { Dashboard } from "./components/dashboard";
import Loading from "./loading";



async function Admin() {
  const session = await checkAuth();
  return (
    <>
      <MainHeader />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Dashboard" />
          <Dashboard isAdmin={session?.user.isAdmin} />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Admin;

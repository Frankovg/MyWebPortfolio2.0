import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";

import { Dashboard } from "./components/dashboard";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

async function Admin() {
  return (
    <>
      <MainHeader />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Dashboard" />
          <Dashboard />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default Admin;

import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";
import { Suspense } from "react";
import Loading from "./downloads/loading";
import AdminSection from "@/components/admin/admin-section";
import AdminPageTitle from "@/components/admin/admin-page-title";
import { Dashboard } from "./components/dashboard";

async function Admin() {
  const breadcrumbLinks = [
    {
      name: "Dashboard",
    },
  ];

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

import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/components/admin-page-title";
import MainHeader from "@/components/admin/components/main-header";
import AdminSection from "@/components/admin-section";

import Loading from "./loading";

async function AddProject() {
  const breadcrumbLinks = [
    {
      name: "Portfolio",
      href: "/admin/portfolio",
    },
    {
      name: "Add Project",
    },
  ];

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Add Project" showGoBack={true} />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default AddProject;

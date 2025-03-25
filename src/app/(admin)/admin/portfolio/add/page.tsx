import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import MainHeader from "@/components/admin/main-header";
import AdminSection from "@/components/admin-section";

import Loading from "./loading";
import ProjectNewForm from "./components/project-new-form";

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
          <ProjectNewForm />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default AddProject;

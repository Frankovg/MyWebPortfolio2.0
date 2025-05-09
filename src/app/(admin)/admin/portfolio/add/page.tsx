import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { ProjectForm } from "@/components/admin/project-form/index";
import { ProjectFormProvider } from "@/context/project-form-provider";
import { getCategoryBySlug } from "@/lib/server-utils-admin";

import Loading from "./loading";


type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function AddProject({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category as string;

  const breadcrumbLinks = [
    {
      name: "Portfolio",
      href: "/admin/portfolio",
    },
    {
      name: "Add Project",
    },
  ];

  const categoryId = (await getCategoryBySlug(category || "web-development"))
    ?.id;

  if (!categoryId) {
    throw new Error("Category not found");
  }

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Add Project" showGoBack={true} />
          <ProjectFormProvider value={{ actionType: "add", categoryId }}>
            <ProjectForm />
          </ProjectFormProvider>
        </AdminSection>
      </Suspense>
    </>
  );
}

export default AddProject;

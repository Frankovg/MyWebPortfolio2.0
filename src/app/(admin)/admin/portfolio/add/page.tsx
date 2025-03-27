import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import MainHeader from "@/components/admin/main-header";
import AdminSection from "@/components/admin-section";
import { getCategoryBySlug } from "@/lib/server-utils-admin";

import ProjectNewForm from "./components/project-new-form";
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
          <ProjectNewForm categoryId={categoryId} />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default AddProject;

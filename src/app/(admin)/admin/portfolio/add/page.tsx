import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { ProjectForm } from "@/components/admin/project-form/index";
import { getCategoryBySlug } from "@/lib/server-utils-admin";

import { CAT_NAME } from "./dictionary";
import Loading from "./loading";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function AddProject({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category as string;
  const categoryName = category in CAT_NAME ? CAT_NAME[category as keyof typeof CAT_NAME] : ""
  const pageName = `Add Project to ${categoryName}`

  const breadcrumbLinks = [
    {
      name: "Portfolio",
      href: "/admin/portfolio",
    },
    {
      name: pageName,
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
          <AdminPageTitle title={pageName} showGoBack={true} />
          <ProjectForm actionType="add" categoryId={categoryId} />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default AddProject;

import { notFound } from "next/navigation";
import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import MainHeader from "@/components/admin/main-header";
import { ProjectForm } from "@/components/admin/project-form/index";
import { getProjectById } from "@/lib/server-utils-admin";

import Loading from "./loading";

export const dynamic = 'force-dynamic';

async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const breadcrumbLinks = [
    {
      name: "Portfolio",
      href: "/admin/portfolio",
    },
    {
      name: "Edit Project",
    },
  ];

  const project = await getProjectById(id);

  if (!project) notFound()

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Edit Project" showGoBack={true} />
          <ProjectForm
            actionType="edit"
            categoryId={project.categoryId}
            project={project}
          />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default EditProject;

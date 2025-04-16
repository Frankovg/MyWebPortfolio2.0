"use client";

import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

import ProjectForm from "@/components/project-form";

function ProjectNewForm({ categoryId }: { categoryId: string }) {
  const router = useRouter();
  return (
    <ProjectForm
      actionType="add"
      categoryId={categoryId}
      onFormSubmission={() => {
        flushSync(() => {
          router.push("/admin/portfolio");
        });
      }}
    />
  );
}

export default ProjectNewForm;

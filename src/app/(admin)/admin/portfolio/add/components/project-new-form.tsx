"use client";

import ProjectForm from "@/components/admin/project-form/index";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

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

"use client";

import ProjectForm from "@/components/project-form";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";

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

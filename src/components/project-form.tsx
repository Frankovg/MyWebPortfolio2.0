"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useProjectContext } from "@/hooks/use-project-context";
import { FALLBACK_IMG } from "@/lib/constants";
import { Action } from "@/lib/types";
import { projectFormSchema, TProjectForm } from "@/lib/validations";

type ProjectFormProps = {
  actionType: Action;
  categoryId: string;
};

function ProjectForm({ actionType, categoryId }: ProjectFormProps) {
  const { createProjectByCategoryId } = useProjectContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            image: "",
            title: "",
            shortDescription: "",
            description: "",
            slug: "",
            gallery: [],
            date: new Date(),
            client: "",
            clientUrl: "",
            techStack: [],
            roles: [],
            published: true,
          }
        : undefined,
  });

  return (
    <form
      className=""
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const project = getValues();
        project.image = project.image || FALLBACK_IMG;

        // if (actionType === "add") {
        //   await createProjectByCategoryId(project, categoryId);
        // }
      }}
    >
      <></>
    </form>
  );
}

export default ProjectForm;

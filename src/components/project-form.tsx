"use client";

import { useProjectContext } from "@/hooks/use-project-context";
import { projectFormSchema, TProjectForm } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Action } from "@/lib/types";

type ProjectFormProps = {
  actionType: Action;
};

function ProjectForm({ actionType }: ProjectFormProps) {
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

  return <>Form</>;
}

export default ProjectForm;

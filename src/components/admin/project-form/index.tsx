"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useProjectContext } from "@/hooks/use-project-context";
import { DEFAULT_PROJECT_FORM, FALLBACK_IMG } from "@/lib/constants";
import { Action } from "@/lib/types";
import { projectFormSchema, TProjectForm } from "@/lib/validations";

import { ProjectFormProvider } from "../../../context/project-form-provider";
import { ProjectFormContainer } from "./project-form-container";

type ProjectFormProps = {
  actionType: Action;
  categoryId: string;
  onFormSubmission: VoidFunction;
};

function ProjectForm({
  actionType,
  categoryId,
  onFormSubmission,
}: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { createProjectByCategoryId } = useProjectContext();

  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: DEFAULT_PROJECT_FORM,
  });

  const handleFormSubmit = async () => {
    startTransition(async () => {
      const result = await trigger();
      if (!result) {
        const errorMessage =
          "Form validation failed. Please check the highlighted fields and try again.";
        toast.error(errorMessage);
        console.warn(errorMessage);
        return;
      }

      onFormSubmission();

      const project = getValues();
      project.image = project.image || FALLBACK_IMG;

      if (actionType === "add") {
        await createProjectByCategoryId(project, categoryId);
      } else if (actionType === "edit") {
        //TODO: Add edit project by categoryId
      }
    });
  };

  const formContextValue = {
    register,
    control,
    errors,
    watch,
    getValues,
    trigger,
    actionType,
    categoryId,
    isPending,
  };

  return (
    <ProjectFormProvider value={formContextValue}>
      <ProjectFormContainer
        onSubmit={handleFormSubmit}
        onCancel={() => router.back()}
        isPending={isPending}
      />
    </ProjectFormProvider>
  );
}

export default ProjectForm;

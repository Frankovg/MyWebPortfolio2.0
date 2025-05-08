"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { createContext, ReactNode, useTransition } from "react";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { projectFormSchema, TProjectForm } from "@/lib/validations";
import { Action } from "@/lib/types";
import { DEFAULT_PROJECT_FORM, FALLBACK_IMG } from "@/lib/constants";
import { toast } from "sonner";
import { useProjectContext } from "@/hooks/use-project-context";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

type ProjectFormContextType = {
  actionType: Action;
  categoryId: string;
  onSubmit: () => Promise<void>;
  isPending: boolean;
  register: UseFormRegister<TProjectForm>;
  control: Control<TProjectForm>;
  errors: FieldErrors<TProjectForm>;
  watch: UseFormWatch<TProjectForm>;
  getValues: UseFormGetValues<TProjectForm>;
  trigger: UseFormTrigger<TProjectForm>;
  goBack: () => void;
};

export const ProjectFormContext = createContext<
  ProjectFormContextType | undefined
>(undefined);

type ProjectFormProviderProps = {
  children: ReactNode;
  value: Pick<ProjectFormContextType, "actionType" | "categoryId">;
};

export function ProjectFormProvider({
  children,
  value,
}: ProjectFormProviderProps) {
  const { actionType, categoryId } = value;
  const [isPending, startTransition] = useTransition();
  const { createProjectByCategoryId } = useProjectContext();
  const router = useRouter();
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

  const onSubmit = async () => {
    startTransition(async () => {
      const result = await trigger();
      if (!result) {
        const errorMessage =
          "Form validation failed. Please check the highlighted fields and try again.";
        toast.error(errorMessage);
        console.warn(errorMessage);
        return;
      }

      flushSync(() => {
        router.push("/admin/portfolio");
      });

      const project = getValues();
      project.image = project.image || FALLBACK_IMG;

      if (actionType === "add") {
        await createProjectByCategoryId(project, categoryId);
      } else if (actionType === "edit") {
        //TODO: Add edit project by categoryId
      }
    });
  };

  const goBack = () => {
    router.back();
  };

  return (
    <ProjectFormContext.Provider
      value={{
        onSubmit,
        register,
        trigger,
        actionType,
        isPending,
        categoryId,
        control,
        errors,
        watch,
        getValues,
        goBack,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
}

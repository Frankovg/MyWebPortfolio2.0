"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { IProjectFull } from "@/lib/types";
import { projectFormSchema, TProjectForm } from "@/lib/validations";
import { useProjectFormStore } from "@/stores/use-project-form-store";
import { getDefaultProjectFormValues } from "@/utils/getDefaultProjectFormValues";

type ProjectFormInitializerProps = {
  project?: IProjectFull;
  children: React.ReactNode;
};

export function ProjectFormInitializer({
  project,
  children,
}: ProjectFormInitializerProps) {
  const setFormMethods = useProjectFormStore((s) => s.setFormMethods);
  const setProject = useProjectFormStore((s) => s.setProject);
  const setErrors = useProjectFormStore((s) => s.setErrors);
  const reset = useProjectFormStore((s) => s.reset);

  const [isInitialized, setIsInitialized] = useState(false);

  const {
    register,
    trigger,
    getValues,
    watch,
    control,
    reset: resetForm,
    formState: { errors },
  } = useForm<TProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: getDefaultProjectFormValues(project),
  });

  useLayoutEffect(() => {
    setProject(project);
    setFormMethods({
      register,
      control,
      errors,
      watch,
      getValues,
      trigger,
      resetForm,
    });
    setIsInitialized(true);

    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setErrors(errors);
  }, [errors, setErrors]);

  if (!isInitialized) return null;

  return <>{children}</>;
}

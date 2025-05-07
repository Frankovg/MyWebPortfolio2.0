"use client";

import { createContext, ReactNode } from "react";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { TProjectForm } from "@/lib/validations";
import { Action } from "@/lib/types";

type ProjectFormContextType = {
  register: UseFormRegister<TProjectForm>;
  control: Control<TProjectForm>;
  errors: FieldErrors<TProjectForm>;
  watch: UseFormWatch<TProjectForm>;
  getValues: UseFormGetValues<TProjectForm>;
  trigger: UseFormTrigger<TProjectForm>;
  actionType: Action;
  categoryId: string;
  isPending: boolean;
};

export const ProjectFormContext = createContext<
  ProjectFormContextType | undefined
>(undefined);

type ProjectFormProviderProps = {
  children: ReactNode;
  value: ProjectFormContextType;
};

export function ProjectFormProvider({
  children,
  value,
}: ProjectFormProviderProps) {
  return (
    <ProjectFormContext.Provider value={value}>
      {children}
    </ProjectFormContext.Provider>
  );
}

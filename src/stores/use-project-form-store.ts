"use client";

import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "sonner";
import { create } from "zustand";

import { FALLBACK_IMG } from "@/lib/constants";

import { useProjectStore } from "./use-project-store";

import type { Action, IProjectFull } from "@/lib/types";
import type { TProjectForm } from "@/lib/validations";

type ProjectFormState = {
  isPending: boolean;
  project: IProjectFull | undefined;
  register: UseFormRegister<TProjectForm> | null;
  control: Control<TProjectForm> | null;
  errors: FieldErrors<TProjectForm>;
  watch: UseFormWatch<TProjectForm> | null;
  getValues: UseFormGetValues<TProjectForm> | null;
  trigger: UseFormTrigger<TProjectForm> | null;
  resetForm: UseFormReset<TProjectForm> | null;
};

type ProjectFormActions = {
  setIsPending: (isPending: boolean) => void;
  setProject: (project: IProjectFull | undefined) => void;
  setFormMethods: (methods: {
    register: UseFormRegister<TProjectForm>;
    control: Control<TProjectForm>;
    errors: FieldErrors<TProjectForm>;
    watch: UseFormWatch<TProjectForm>;
    getValues: UseFormGetValues<TProjectForm>;
    trigger: UseFormTrigger<TProjectForm>;
    resetForm: UseFormReset<TProjectForm>;
  }) => void;
  setErrors: (errors: FieldErrors<TProjectForm>) => void;
  onSubmit: (actionType: Action, categoryId: string) => Promise<void>;
  reset: () => void;
};

type ProjectFormStore = ProjectFormState & ProjectFormActions;

const initialState: ProjectFormState = {
  isPending: false,
  project: undefined,
  register: null,
  control: null,
  errors: {},
  watch: null,
  getValues: null,
  trigger: null,
  resetForm: null,
};

export const useProjectFormStore = create<ProjectFormStore>((set, get) => ({
  ...initialState,

  setIsPending: (isPending) => set({ isPending }),

  setProject: (project) => set({ project }),

  setFormMethods: (methods) =>
    set({
      register: methods.register,
      control: methods.control,
      errors: methods.errors,
      watch: methods.watch,
      getValues: methods.getValues,
      trigger: methods.trigger,
      resetForm: methods.resetForm,
    }),

  setErrors: (errors) => set({ errors }),

  onSubmit: async (actionType, categoryId) => {
    const { trigger, getValues, project } = get();

    if (!trigger || !getValues) {
      if (process.env.NODE_ENV === "development") {
        console.error("Form methods not initialized");
      }
      return;
    }

    set({ isPending: true });

    try {
      const result = await trigger();
      if (!result) {
        const errorMessage =
          "Form validation failed. Please check the highlighted fields and try again.";
        toast.error(errorMessage);
        console.warn(errorMessage);
        return;
      }

      const projectValues = getValues();
      projectValues.image = projectValues.image ?? FALLBACK_IMG;

      const { createProjectByCategoryId, handleEditProject } =
        useProjectStore.getState();

      if (actionType === "add") {
        await createProjectByCategoryId(projectValues, categoryId);
      } else if (actionType === "edit") {
        await handleEditProject(project?.id ?? "", projectValues, categoryId);
      }
    } finally {
      set({ isPending: false });
    }
  },

  reset: () => set(initialState),
}));

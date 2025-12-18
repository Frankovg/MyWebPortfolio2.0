"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { flushSync } from "react-dom";
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
import { Action, IProjectFull } from "@/lib/types";
import { TProjectForm } from "@/lib/validations";

import { useProjectStore } from "./use-project-store";

//TODO: Separar funciones a utils y agregar tests unitarios

const getProjectImages = (project?: IProjectFull) => {
  if (!project) return null;
  return project.gallery.map((image) => ({
    alt: image.alt,
    description: image.description ?? null,
    imageUrl: image.imageUrl,
  }));
};

const getTechStack = (project?: IProjectFull) => {
  if (!project) return null;
  return project.techStack.map((tech) => ({
    value: tech.value,
  }));
};

const getRoles = (project?: IProjectFull) => {
  if (!project) return null;
  return project.roles.map((role) => ({
    label: role.label,
    value: role.value,
    percentage: role.percentage,
  }));
};

export const getDefaultFormValues = (project?: IProjectFull): TProjectForm => ({
  title: project?.title ?? "",
  image: project?.image ?? "",
  slug: project?.slug ?? "",
  date: project?.date ?? new Date(),
  published: project?.published ?? false,
  shortDescription: project?.shortDescription ?? "",
  description: project?.description ?? "",
  gallery: getProjectImages(project) ?? [
    {
      imageUrl: "",
      alt: "",
      description: null,
    },
  ],
  techStack: getTechStack(project) ?? [{ value: "" }],
  roles: getRoles(project) ?? [
    {
      label: "",
      value: "",
      percentage: 50,
    },
  ],
  websiteUrl: project?.websiteUrl ?? null,
  company: project?.company ?? null,
  companyUrl: project?.companyUrl ?? null,
  client: project?.client ?? null,
  clientUrl: project?.clientUrl ?? null,
  repository: project?.repository ?? null,
  videoUrl: project?.videoUrl ?? null,
  videoTitle: project?.videoTitle ?? null,
  videoDescription: project?.videoDescription ?? null,
});

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
  onSubmit: (
    actionType: Action,
    categoryId: string,
    router: AppRouterInstance
  ) => Promise<void>;
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

  onSubmit: async (actionType, categoryId, router) => {
    const { trigger, getValues, project } = get();

    if (!trigger || !getValues) {
      console.error("Form methods not initialized");
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

      flushSync(() => {
        router.push("/admin/portfolio");
      });

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

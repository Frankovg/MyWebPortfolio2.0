"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useTransition } from "react";
import { flushSync } from "react-dom";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "sonner";

import { useProjectContext } from "@/hooks/use-project-context";
import { FALLBACK_IMG } from "@/lib/constants";
import { Action, IProjectFull } from "@/lib/types";
import { projectFormSchema, TProjectForm } from "@/lib/validations";

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

type ProjectFormContextType = {
  onSubmit: (actionType: Action, categoryId: string) => Promise<void>;
  isPending: boolean;
  register: UseFormRegister<TProjectForm>;
  control: Control<TProjectForm>;
  errors: FieldErrors<TProjectForm>;
  watch: UseFormWatch<TProjectForm>;
  getValues: UseFormGetValues<TProjectForm>;
  trigger: UseFormTrigger<TProjectForm>;
};

export const ProjectFormContext = createContext<
  ProjectFormContextType | undefined
>(undefined);

type ProjectFormProviderProps = {
  children: ReactNode;
  project?: IProjectFull;
};

export function ProjectFormProvider({
  children,
  project,
}: ProjectFormProviderProps) {
  const [isPending, startTransition] = useTransition();
  const { createProjectByCategoryId, handleEditProject } = useProjectContext();
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
    defaultValues: {
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
    },
  });

  const onSubmit = async (actionType: Action, categoryId: string) => {
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

      const projectValues = getValues();
      projectValues.image = projectValues.image ?? FALLBACK_IMG;

      if (actionType === "add") {
        await createProjectByCategoryId(projectValues, categoryId);
      } else if (actionType === "edit") {
        await handleEditProject(project?.id ?? "", projectValues, categoryId);
      }
    });
  };

  return (
    <ProjectFormContext.Provider
      value={{
        onSubmit,
        register,
        trigger,
        isPending,
        control,
        errors,
        watch,
        getValues,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
}

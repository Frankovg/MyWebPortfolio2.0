"use client";

import { createContext, startTransition, useOptimistic } from "react";
import { toast } from "sonner";

import { addProject, deleteProject, editProject } from "@/actions/index";
import {
  Action,
  ICategoryWithProjectsAdmin,
  ProjectEssentials,
} from "@/lib/types";
import { showErrorMessage } from "@/utils/showErrorMessage";

type ProjectContextProviderProps = {
  data: ICategoryWithProjectsAdmin[];
  children: React.ReactNode;
};

type TProjectContext = {
  categories: ICategoryWithProjectsAdmin[];
  createProjectByCategoryId: (
    newProject: ProjectEssentials,
    categoryId: string
  ) => Promise<void>;
  handleDeleteProject: (projectId: string, categoryId: string) => Promise<void>;
  handleEditProject: (
    projectId: string,
    project: ProjectEssentials,
    categoryId: string
  ) => Promise<void>;
};

type PayloadCreate = ProjectEssentials & { categoryId: string };
type PayloadEdit = ProjectEssentials & {
  projectId: string;
  categoryId: string;
};
type PayloadDelete = { projectId: string; categoryId: string };
type Payload = PayloadCreate | PayloadEdit | PayloadDelete;

export const ProjectContext = createContext<TProjectContext | null>(null);

const ProjectContextProvider = ({
  data,
  children,
}: ProjectContextProviderProps) => {
  const [optimisticCategories, setOptimisticCategories] = useOptimistic(
    data,
    (prev, { action, payload }: { action: Action; payload: Payload }) => {
      const now = new Date();
      switch (action) {
        case "add":
          return prev.map((category) => {
            if (
              !("projectId" in payload) &&
              category.id === payload.categoryId
            ) {
              return {
                ...category,
                projects: [
                  ...category.projects,
                  {
                    ...payload,
                    id: Math.random().toString(),
                    categoryId: payload.categoryId,
                    createdAt: now,
                    updatedAt: now,
                  },
                ],
              };
            }
            return category;
          });
        case "edit":
          return prev.map((category) => {
            if (
              !!("projectId" in payload) &&
              category.id === payload.categoryId
            ) {
              return {
                ...category,
                projects: category.projects.map((project) => {
                  if (project.id === payload.projectId) {
                    return {
                      ...project,
                      ...payload,
                      updatedAt: new Date(),
                    };
                  }
                  return project;
                }),
              };
            }
            return category;
          });
        case "delete":
          return prev.map((category) => {
            if ("projectId" in payload && category.id === payload.categoryId) {
              return {
                ...category,
                projects: category.projects.filter(
                  (project) => project.id !== payload.projectId
                ),
              };
            }
            return category;
          });
        default:
          return prev;
      }
    }
  );

  const createProjectByCategoryId = async (
    newProject: ProjectEssentials,
    categoryId: string
  ) => {
    setOptimisticCategories({
      action: "add",
      payload: { ...newProject, categoryId },
    });
    const error = await addProject(newProject, categoryId);
    if (!!error) {
      showErrorMessage(error);
      return;
    }
  };

  const handleDeleteProject = async (projectId: string, categoryId: string) => {
    startTransition(() => {
      setOptimisticCategories({
        action: "delete",
        payload: { projectId, categoryId },
      });
    });

    const error = await deleteProject(projectId);
    if (!!error) {
      showErrorMessage(error);
      return;
    }
  };

  const handleEditProject = async (
    projectId: string,
    project: ProjectEssentials,
    categoryId: string
  ) => {
    setOptimisticCategories({
      action: "edit",
      payload: { projectId, ...project, categoryId },
    });
    const error = await editProject(projectId, project, categoryId);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        categories: optimisticCategories,
        createProjectByCategoryId,
        handleEditProject,
        handleDeleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;

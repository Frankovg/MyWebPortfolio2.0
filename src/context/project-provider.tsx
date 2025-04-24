"use client";

import { createContext, startTransition, useOptimistic } from "react";
import { toast } from "sonner";

import { addProject, deleteProject, editProject } from "@/actions/actions";
import { SAMPLE_ACTION } from "@/lib/constants";
import {
  Action,
  ICategoryWithProjectsAdmin,
  ProjectEssentials,
} from "@/lib/types";

const showErrorMessage = (error: { message: string }) => {
  if (error.message === SAMPLE_ACTION) {
    toast.warning("This is a sample action with no effects.");
    console.warn(error.message);
  } else {
    toast.error(error.message);
    console.error(error.message);
  }
};

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
  // handleEditProject: (
  //   projectId: Project["id"],
  //   newProjectData: ProjectEssentials
  // ) => Promise<void>;
};

type PayloadCreate = ProjectEssentials & { categoryId: string };
type PayloadDelete = { projectId: string; categoryId: string };
type Payload = PayloadCreate | PayloadDelete;

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
        // case "edit":
        //   //TODO: check
        //   return prev.map((category) => {
        //     return {
        //       ...category,
        //       projects: category.projects.map((project) => {
        //         if (project.slug === payload.slug) {
        //           return { ...project, ...payload, updatedAt: now };
        //         }
        //         return project;
        //       }),
        //     };
        //   });
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
    // Wrap the optimistic update in startTransition
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

  // const handleEditProject = async (
  //   projectId: Project["id"],
  //   newProjectData: ProjectEssentials
  // ) => {
  //   setOptimisticProjects({
  //     action: "edit",
  //     payload: { id: projectId, newProjectData },
  //   });
  //   const error = await editProject(projectId, newProjectData);
  //   // if (error) {
  //   //   toast.warning(error.message)
  //   //   return
  //   // }
  // };

  // const handleDeleteProject = async (projectId: Project["id"]) => {
  //   setOptimisticProjects({ action: "delete", payload: projectId });
  //   const error = await deleteProject(projectId);
  //   // if (error) {
  //   //   toast.warning(error.message)
  //   //   return
  //   // }
  // };

  return (
    <ProjectContext.Provider
      value={{
        categories: optimisticCategories,
        createProjectByCategoryId,
        // handleEditProject,
        handleDeleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;

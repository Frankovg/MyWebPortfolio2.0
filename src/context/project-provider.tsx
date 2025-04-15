"use client";

import { Project } from "@prisma/client";
import { createContext, useOptimistic } from "react";
import { toast } from "sonner";

import { addProject, deleteProject, editProject } from "@/actions/actions";
import { SAMPLE_ACTION } from "@/lib/constants";
import {
  Action,
  ICategoryWithProjectsAdmin,
  ProjectEssentials,
} from "@/lib/types";
import { TProjectForm } from "@/lib/validations";

type ProjectContextProviderProps = {
  data: Project[];
  children: React.ReactNode;
};

type TProjectContext = {
  projects: Project[];
  createProjectByCategoryId: (
    newProject: ProjectEssentials,
    categoryId: string
  ) => Promise<void>;
  // handleDeleteProject: (projectId: Project["id"]) => Promise<void>;
  // handleEditProject: (
  //   projectId: Project["id"],
  //   newProjectData: ProjectEssentials
  // ) => Promise<void>;
};

type Payload = ProjectEssentials & { categoryId: string };

export const ProjectContext = createContext<TProjectContext | null>(null);

const ProjectContextProvider = ({
  data,
  children,
}: ProjectContextProviderProps) => {
  //TODO: Take a look of this state
  const [optimisticProjects, setOptimisticProjects] = useOptimistic(
    data,
    (prev, { action, payload }: { action: Action; payload: Payload }) => {
      const now = new Date();
      switch (action) {
        case "add":
          return [
            ...prev,
            {
              ...payload,
              id: Math.random().toString(),
              categoryId: payload.categoryId || "",
              createdAt: now,
              updatedAt: now,
            },
          ];
        case "edit":
          return prev.map((project) => {
            if (project.slug === payload.slug) {
              return { ...project, ...payload, updatedAt: now };
            }
            return project;
          });
        case "delete":
          return prev.filter((project) => project.slug !== payload.slug);
        default:
          return prev;
      }
    }
  );

  const createProjectByCategoryId = async (
    newProject: ProjectEssentials,
    categoryId: string
  ) => {
    setOptimisticProjects({
      action: "add",
      payload: { ...newProject, categoryId },
    });
    const error = await addProject(newProject, categoryId);
    if (!!error) {
      if (error.message === SAMPLE_ACTION) {
        toast.warning("This is a sample action with no effects.");
        console.warn(error.message);
      } else {
        toast.error(error.message);
        console.error(error.message);
      }
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
        projects: optimisticProjects,
        createProjectByCategoryId,
        // handleEditProject,
        // handleDeleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;

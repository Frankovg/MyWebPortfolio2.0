"use client";

import { Project } from "@prisma/client";
import { createContext, useOptimistic } from "react";

import { addProject, deleteProject, editProject } from "@/actions/actions";
import {
  Action,
  ICategoryWithProjectsAdmin,
  ProjectEssentials,
} from "@/lib/types";
import { SAMPLE_ACTION } from "@/constants/admin-constants";
import { toast } from "sonner";

type ProjectContextProviderProps = {
  data: ICategoryWithProjectsAdmin[];
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

export const ProjectContext = createContext<TProjectContext | null>(null);

const ProjectContextProvider = ({
  data,
  children,
}: ProjectContextProviderProps) => {
  //TODO: Take a look of this state
  const [optimisticProjects, setOptimisticProjects] = useOptimistic(
    data,
    (prev, { action, payload }: { action: Action; payload: any }) => {
      switch (action) {
        case "add":
          return [...prev, { ...payload, id: Math.random().toString() }];
        case "edit":
          return prev.map((project) => {
            if (project.id === payload.id) {
              return { ...project, ...payload.newProjectData };
            }
            return project;
          });
        case "delete":
          return prev.filter((project) => project.id !== payload);
        default:
          return prev;
      }
    }
  );

  const createProjectByCategoryId = async (
    newProject: ProjectEssentials,
    categoryId: string
  ) => {
    setOptimisticProjects({ action: "add", payload: newProject });
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

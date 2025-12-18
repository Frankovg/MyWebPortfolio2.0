import { create } from "zustand";

import { addProject, deleteProject, editProject } from "@/actions/index";
import {
  Action,
  ICategoryWithProjectsAdmin,
  ProjectEssentials,
} from "@/lib/types";
import { showErrorMessage } from "@/utils/showErrorMessage";

type PayloadCreate = ProjectEssentials & { categoryId: string };
type PayloadEdit = ProjectEssentials & {
  projectId: string;
  categoryId: string;
};
type PayloadDelete = { projectId: string; categoryId: string };
type Payload = PayloadCreate | PayloadEdit | PayloadDelete;

type ProjectState = {
  categories: ICategoryWithProjectsAdmin[];
  originalCategories: ICategoryWithProjectsAdmin[];
};

type ProjectActions = {
  setCategories: (data: ICategoryWithProjectsAdmin[]) => void;

  applyOptimisticUpdate: (action: Action, payload: Payload) => void;

  rollback: () => void;

  createProjectByCategoryId: (
    newProject: ProjectEssentials,
    categoryId: string
  ) => Promise<void>;

  handleDeleteProject: (
    projectId: string,
    categoryId: string
  ) => Promise<void>;

  handleEditProject: (
    projectId: string,
    project: ProjectEssentials,
    categoryId: string
  ) => Promise<void>;

  reset: () => void;
};

type ProjectStore = ProjectState & ProjectActions;

const initialState: ProjectState = {
  categories: [],
  originalCategories: [],
};

const optimisticReducer = (
  prev: ICategoryWithProjectsAdmin[],
  action: Action,
  payload: Payload
): ICategoryWithProjectsAdmin[] => {
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
          "projectId" in payload &&
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
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  ...initialState,

  setCategories: (data) =>
    set({
      categories: data,
      originalCategories: data,
    }),

  applyOptimisticUpdate: (action, payload) =>
    set((state) => ({
      originalCategories: state.categories,
      categories: optimisticReducer(state.categories, action, payload),
    })),

  rollback: () =>
    set((state) => ({
      categories: state.originalCategories,
    })),

  createProjectByCategoryId: async (newProject, categoryId) => {
    const { applyOptimisticUpdate, rollback } = get();

    applyOptimisticUpdate("add", { ...newProject, categoryId });

    const error = await addProject(newProject, categoryId);
    if (error) {
      rollback();
      showErrorMessage(error);
      return;
    }
  },

  handleDeleteProject: async (projectId, categoryId) => {
    const { applyOptimisticUpdate, rollback } = get();

    applyOptimisticUpdate("delete", { projectId, categoryId });

    const error = await deleteProject(projectId);
    if (error) {
      rollback();
      showErrorMessage(error);
      return;
    }
  },

  handleEditProject: async (projectId, project, categoryId) => {
    const { applyOptimisticUpdate, rollback } = get();

    applyOptimisticUpdate("edit", { projectId, ...project, categoryId });

    const error = await editProject(projectId, project, categoryId);
    if (error) {
      rollback();
      showErrorMessage(error);
      return;
    }
  },

  reset: () => set(initialState),
}));

import type { Action, ICategoryWithProjectsAdmin, Payload } from "@/lib/types";

export const optimisticReducer = (
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

import { optimisticReducer } from "./projectOptimisticReducer";

import type { ICategoryWithProjectsAdmin, Payload } from "@/lib/types";


describe("optimisticReducer", () => {
  const mockDate = new Date("2024-01-15T10:00:00Z");

  const createMockCategory = (
    id: string,
    projects: ICategoryWithProjectsAdmin["projects"] = []
  ): ICategoryWithProjectsAdmin => ({
    id,
    name: `Category ${id}`,
    value: `category-${id}`,
    projects,
  });

  const createMockProject = (
    id: string,
    categoryId: string
  ): ICategoryWithProjectsAdmin["projects"][0] => ({
    id,
    categoryId,
    title: `Project ${id}`,
    slug: `project-${id}`,
    shortDescription: "Test short description",
    description: "Test description",
    image: "test-image.jpg",
    date: mockDate,
    company: null,
    companyUrl: null,
    client: null,
    clientUrl: null,
    repository: null,
    websiteUrl: null,
    videoUrl: null,
    videoTitle: null,
    videoDescription: null,
    published: true,
    createdAt: mockDate,
    updatedAt: mockDate,
  });

  const basePayload = {
    title: "New Project",
    slug: "new-project",
    shortDescription: "New short description",
    description: "New description",
    image: "new-image.jpg",
    date: mockDate,
    company: null,
    companyUrl: null,
    client: null,
    clientUrl: null,
    repository: null,
    websiteUrl: null,
    videoUrl: null,
    videoTitle: null,
    videoDescription: null,
    published: true,
  };

  beforeEach(() => {
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    jest.spyOn(Math, "random").mockReturnValue(0.123456789);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("add action", () => {
    it("should add a project to the correct category", () => {
      const categories = [
        createMockCategory("cat-1"),
        createMockCategory("cat-2"),
      ];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
      };

      const result = optimisticReducer(categories, "add", payload);

      expect(result[0].projects).toHaveLength(1);
      expect(result[0].projects[0]).toMatchObject({
        title: "New Project",
        slug: "new-project",
        categoryId: "cat-1",
      });
      expect(result[1].projects).toHaveLength(0);
    });

    it("should append project to existing projects in category", () => {
      const existingProject = createMockProject("existing-1", "cat-1");
      const categories = [createMockCategory("cat-1", [existingProject])];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
      };

      const result = optimisticReducer(categories, "add", payload);

      expect(result[0].projects).toHaveLength(2);
      expect(result[0].projects[0].id).toBe("existing-1");
      expect(result[0].projects[1].title).toBe("New Project");
    });

    it("should generate a random id for the new project", () => {
      const categories = [createMockCategory("cat-1")];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
      };

      const result = optimisticReducer(categories, "add", payload);

      expect(result[0].projects[0].id).toBe("0.123456789");
    });

    it("should set createdAt and updatedAt timestamps", () => {
      const categories = [createMockCategory("cat-1")];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
      };

      const result = optimisticReducer(categories, "add", payload);

      expect(result[0].projects[0].createdAt).toEqual(mockDate);
      expect(result[0].projects[0].updatedAt).toEqual(mockDate);
    });

    it("should not modify categories that don't match", () => {
      const categories = [
        createMockCategory("cat-1"),
        createMockCategory("cat-2"),
      ];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
      };

      const result = optimisticReducer(categories, "add", payload);

      expect(result[1]).toBe(categories[1]);
    });

    it("should not add project if payload has projectId (edit payload)", () => {
      const categories = [createMockCategory("cat-1")];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(categories, "add", payload);

      expect(result[0].projects).toHaveLength(0);
    });
  });

  describe("edit action", () => {
    it("should update the correct project in the correct category", () => {
      const existingProject = createMockProject("proj-1", "cat-1");
      const categories = [createMockCategory("cat-1", [existingProject])];
      const payload: Payload = {
        ...basePayload,
        title: "Updated Title",
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(categories, "edit", payload);

      expect(result[0].projects[0].title).toBe("Updated Title");
      expect(result[0].projects[0].id).toBe("proj-1");
    });

    it("should update the updatedAt timestamp", () => {
      const existingProject = createMockProject("proj-1", "cat-1");
      existingProject.updatedAt = new Date("2023-01-01");
      const categories = [createMockCategory("cat-1", [existingProject])];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(categories, "edit", payload);

      expect(result[0].projects[0].updatedAt).toEqual(mockDate);
    });

    it("should not modify other projects in the same category", () => {
      const project1 = createMockProject("proj-1", "cat-1");
      const project2 = createMockProject("proj-2", "cat-1");
      const categories = [createMockCategory("cat-1", [project1, project2])];
      const payload: Payload = {
        ...basePayload,
        title: "Updated Title",
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(categories, "edit", payload);

      expect(result[0].projects[1]).toBe(project2);
    });

    it("should not modify projects in other categories", () => {
      const project1 = createMockProject("proj-1", "cat-1");
      const project2 = createMockProject("proj-2", "cat-2");
      const categories = [
        createMockCategory("cat-1", [project1]),
        createMockCategory("cat-2", [project2]),
      ];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(categories, "edit", payload);

      expect(result[1]).toBe(categories[1]);
    });

    it("should not edit if payload lacks projectId (add payload)", () => {
      const existingProject = createMockProject("proj-1", "cat-1");
      const categories = [createMockCategory("cat-1", [existingProject])];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
      };

      const result = optimisticReducer(categories, "edit", payload);

      expect(result[0].projects[0].title).toBe("Project proj-1");
    });
  });

  describe("delete action", () => {
    it("should remove the correct project from the correct category", () => {
      const project1 = createMockProject("proj-1", "cat-1");
      const project2 = createMockProject("proj-2", "cat-1");
      const categories = [createMockCategory("cat-1", [project1, project2])];
      const payload: Payload = {
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(categories, "delete", payload);

      expect(result[0].projects).toHaveLength(1);
      expect(result[0].projects[0].id).toBe("proj-2");
    });

    it("should not modify other categories", () => {
      const project1 = createMockProject("proj-1", "cat-1");
      const project2 = createMockProject("proj-2", "cat-2");
      const categories = [
        createMockCategory("cat-1", [project1]),
        createMockCategory("cat-2", [project2]),
      ];
      const payload: Payload = {
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(categories, "delete", payload);

      expect(result[1]).toBe(categories[1]);
      expect(result[1].projects).toHaveLength(1);
    });

    it("should handle deleting from empty category gracefully", () => {
      const categories = [createMockCategory("cat-1")];
      const payload: Payload = {
        categoryId: "cat-1",
        projectId: "non-existent",
      };

      const result = optimisticReducer(categories, "delete", payload);

      expect(result[0].projects).toHaveLength(0);
    });

    it("should handle non-existent project id gracefully", () => {
      const project1 = createMockProject("proj-1", "cat-1");
      const categories = [createMockCategory("cat-1", [project1])];
      const payload: Payload = {
        categoryId: "cat-1",
        projectId: "non-existent",
      };

      const result = optimisticReducer(categories, "delete", payload);

      expect(result[0].projects).toHaveLength(1);
      expect(result[0].projects[0].id).toBe("proj-1");
    });
  });

  describe("default case", () => {
    it("should return the original state for unknown actions", () => {
      const categories = [createMockCategory("cat-1")];
      const payload: Payload = {
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      const result = optimisticReducer(
        categories,
        "unknown" as "add",
        payload
      );

      expect(result).toBe(categories);
    });
  });

  describe("immutability", () => {
    it("should not mutate the original state on add", () => {
      const categories = [createMockCategory("cat-1")];
      const originalCategories = [...categories];
      const payload: Payload = {
        ...basePayload,
        categoryId: "cat-1",
      };

      optimisticReducer(categories, "add", payload);

      expect(categories).toEqual(originalCategories);
      expect(categories[0].projects).toHaveLength(0);
    });

    it("should not mutate the original state on edit", () => {
      const project = createMockProject("proj-1", "cat-1");
      const categories = [createMockCategory("cat-1", [project])];
      const originalTitle = project.title;
      const payload: Payload = {
        ...basePayload,
        title: "Updated Title",
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      optimisticReducer(categories, "edit", payload);

      expect(categories[0].projects[0].title).toBe(originalTitle);
    });

    it("should not mutate the original state on delete", () => {
      const project = createMockProject("proj-1", "cat-1");
      const categories = [createMockCategory("cat-1", [project])];
      const payload: Payload = {
        categoryId: "cat-1",
        projectId: "proj-1",
      };

      optimisticReducer(categories, "delete", payload);

      expect(categories[0].projects).toHaveLength(1);
    });
  });
});

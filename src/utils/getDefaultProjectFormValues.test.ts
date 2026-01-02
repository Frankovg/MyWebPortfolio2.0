import {
  createMockGallery,
  createMockProjectFull,
  createMockRole,
  createMockTech,
} from "./__mocks__/mocks";
import { getDefaultProjectFormValues } from "./getDefaultProjectFormValues";

describe("getDefaultProjectFormValues", () => {
  const mockDate = new Date("2024-01-15T10:00:00Z");

  describe("when project is undefined", () => {
    it("should return default values for all fields", () => {
      const result = getDefaultProjectFormValues(undefined);

      expect(result.title).toBe("");
      expect(result.image).toBe("");
      expect(result.slug).toBe("");
      expect(result.published).toBe(false);
      expect(result.shortDescription).toBe("");
      expect(result.description).toBe("");
      expect(result.websiteUrl).toBeNull();
      expect(result.company).toBeNull();
      expect(result.companyUrl).toBeNull();
      expect(result.client).toBeNull();
      expect(result.clientUrl).toBeNull();
      expect(result.repository).toBeNull();
      expect(result.videoUrl).toBeNull();
      expect(result.videoTitle).toBeNull();
      expect(result.videoDescription).toBeNull();
    });

    it("should return a Date object for date field", () => {
      const result = getDefaultProjectFormValues(undefined);
      expect(result.date).toBeInstanceOf(Date);
    });

    it("should return default gallery with empty values", () => {
      const result = getDefaultProjectFormValues(undefined);

      expect(result.gallery).toEqual([
        {
          imageUrl: "",
          alt: "",
          description: null,
        },
      ]);
    });

    it("should return default techStack with empty value", () => {
      const result = getDefaultProjectFormValues(undefined);

      expect(result.techStack).toEqual([{ value: "" }]);
    });

    it("should return default roles with empty values and 50% percentage", () => {
      const result = getDefaultProjectFormValues(undefined);

      expect(result.roles).toEqual([
        {
          label: "",
          value: "",
          percentage: 50,
        },
      ]);
    });
  });

  describe("when project is provided", () => {
    it("should map all basic string fields from project", () => {
      const project = createMockProjectFull({
        title: "Test Project",
        slug: "test-project",
        shortDescription: "Short description",
        description: "Full description",
        image: "https://example.com/image.jpg",
      });
      const result = getDefaultProjectFormValues(project);

      expect(result.title).toBe("Test Project");
      expect(result.slug).toBe("test-project");
      expect(result.shortDescription).toBe("Short description");
      expect(result.description).toBe("Full description");
      expect(result.image).toBe("https://example.com/image.jpg");
    });

    it("should map date and published fields", () => {
      const project = createMockProjectFull({ date: mockDate, published: true });
      const result = getDefaultProjectFormValues(project);

      expect(result.date).toEqual(mockDate);
      expect(result.published).toBe(true);
    });

    it("should map optional URL fields", () => {
      const project = createMockProjectFull({
        websiteUrl: "https://project.com",
        repository: "https://github.com/test/repo",
        videoUrl: "https://youtube.com/video",
      });
      const result = getDefaultProjectFormValues(project);

      expect(result.websiteUrl).toBe("https://project.com");
      expect(result.repository).toBe("https://github.com/test/repo");
      expect(result.videoUrl).toBe("https://youtube.com/video");
    });

    it("should map company and client fields", () => {
      const project = createMockProjectFull({
        company: "Test Company",
        companyUrl: "https://company.com",
        client: "Test Client",
        clientUrl: "https://client.com",
      });
      const result = getDefaultProjectFormValues(project);

      expect(result.company).toBe("Test Company");
      expect(result.companyUrl).toBe("https://company.com");
      expect(result.client).toBe("Test Client");
      expect(result.clientUrl).toBe("https://client.com");
    });

    it("should map video fields", () => {
      const project = createMockProjectFull({
        videoUrl: "https://youtube.com/video",
        videoTitle: "Project Demo",
        videoDescription: "A demo of the project",
      });
      const result = getDefaultProjectFormValues(project);

      expect(result.videoUrl).toBe("https://youtube.com/video");
      expect(result.videoTitle).toBe("Project Demo");
      expect(result.videoDescription).toBe("A demo of the project");
    });

    it("should map gallery images using getProjectImages", () => {
      const project = createMockProjectFull({
        gallery: [
          createMockGallery({
            id: "img-1",
            alt: "First",
            description: "First desc",
            imageUrl: "https://example.com/1.jpg",
          }),
          createMockGallery({
            id: "img-2",
            alt: "Second",
            description: null,
            imageUrl: "https://example.com/2.jpg",
          }),
        ],
      });

      const result = getDefaultProjectFormValues(project);

      expect(result.gallery).toEqual([
        {
          alt: "First",
          description: "First desc",
          imageUrl: "https://example.com/1.jpg",
        },
        {
          alt: "Second",
          description: null,
          imageUrl: "https://example.com/2.jpg",
        },
      ]);
    });

    it("should map techStack using getTechStack", () => {
      const project = createMockProjectFull({
        techStack: [
          createMockTech({ id: "tech-1", value: "react" }),
          createMockTech({ id: "tech-2", value: "typescript" }),
        ],
      });

      const result = getDefaultProjectFormValues(project);

      expect(result.techStack).toEqual([
        { value: "react" },
        { value: "typescript" },
      ]);
    });

    it("should map roles using getRoles", () => {
      const project = createMockProjectFull({
        roles: [
          createMockRole({
            id: "role-1",
            label: "Developer",
            value: "developer",
            percentage: 60,
          }),
          createMockRole({
            id: "role-2",
            label: "Designer",
            value: "designer",
            percentage: 40,
          }),
        ],
      });

      const result = getDefaultProjectFormValues(project);

      expect(result.roles).toEqual([
        { label: "Developer", value: "developer", percentage: 60 },
        { label: "Designer", value: "designer", percentage: 40 },
      ]);
    });

    it("should handle null optional fields", () => {
      const project = createMockProjectFull({
        websiteUrl: null,
        company: null,
        companyUrl: null,
        client: null,
        clientUrl: null,
        repository: null,
        videoUrl: null,
        videoTitle: null,
        videoDescription: null,
      });

      const result = getDefaultProjectFormValues(project);

      expect(result.websiteUrl).toBeNull();
      expect(result.company).toBeNull();
      expect(result.companyUrl).toBeNull();
      expect(result.client).toBeNull();
      expect(result.clientUrl).toBeNull();
      expect(result.repository).toBeNull();
      expect(result.videoUrl).toBeNull();
      expect(result.videoTitle).toBeNull();
      expect(result.videoDescription).toBeNull();
    });

    it("should handle empty arrays for gallery, techStack, and roles", () => {
      const project = createMockProjectFull({
        gallery: [],
        techStack: [],
        roles: [],
      });

      const result = getDefaultProjectFormValues(project);

      expect(result.gallery).toEqual([]);
      expect(result.techStack).toEqual([]);
      expect(result.roles).toEqual([]);
    });

    it("should handle published as false", () => {
      const project = createMockProjectFull({ published: false });
      const result = getDefaultProjectFormValues(project);

      expect(result.published).toBe(false);
    });
  });

  describe("return type structure", () => {
    it("should return all required TProjectForm fields", () => {
      const result = getDefaultProjectFormValues(undefined);

      const expectedKeys = [
        "title",
        "image",
        "slug",
        "date",
        "published",
        "shortDescription",
        "description",
        "gallery",
        "techStack",
        "roles",
        "websiteUrl",
        "company",
        "companyUrl",
        "client",
        "clientUrl",
        "repository",
        "videoUrl",
        "videoTitle",
        "videoDescription",
      ];

      expectedKeys.forEach((key) => {
        expect(result).toHaveProperty(key);
      });
    });
  });
});

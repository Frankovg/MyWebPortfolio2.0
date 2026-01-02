import { createMockGallery, createMockProjectFull } from "./__mocks__/mocks";
import { getProjectImages } from "./getProjectImages";

describe("getProjectImages", () => {
  describe("when project is undefined", () => {
    it("should return null", () => {
      const result = getProjectImages(undefined);
      expect(result).toBeNull();
    });
  });

  describe("when project is provided", () => {
    it("should return empty array when project has no gallery images", () => {
      const project = createMockProjectFull({ gallery: [] });
      const result = getProjectImages(project);
      expect(result).toEqual([]);
    });

    it("should map single image correctly", () => {
      const project = createMockProjectFull({
        gallery: [
          createMockGallery({
            alt: "Test image",
            description: "A test description",
            imageUrl: "https://example.com/image.jpg",
          }),
        ],
      });

      const result = getProjectImages(project);

      expect(result).toEqual([
        {
          alt: "Test image",
          description: "A test description",
          imageUrl: "https://example.com/image.jpg",
        },
      ]);
    });

    it("should map multiple images correctly", () => {
      const project = createMockProjectFull({
        gallery: [
          createMockGallery({
            id: "img-1",
            alt: "First image",
            description: "First description",
            imageUrl: "https://example.com/image1.jpg",
          }),
          createMockGallery({
            id: "img-2",
            alt: "Second image",
            description: "Second description",
            imageUrl: "https://example.com/image2.jpg",
          }),
        ],
      });

      const result = getProjectImages(project);

      expect(result).toEqual([
        {
          alt: "First image",
          description: "First description",
          imageUrl: "https://example.com/image1.jpg",
        },
        {
          alt: "Second image",
          description: "Second description",
          imageUrl: "https://example.com/image2.jpg",
        },
      ]);
    });

    it("should handle null description by keeping it as null", () => {
      const project = createMockProjectFull({
        gallery: [
          createMockGallery({
            description: null,
          }),
        ],
      });

      const result = getProjectImages(project);

      expect(result![0].description).toBeNull();
    });

    it("should convert undefined description to null", () => {
      const project = createMockProjectFull({
        gallery: [
          createMockGallery({
            description: undefined as unknown as string | null,
          }),
        ],
      });

      const result = getProjectImages(project);

      expect(result![0].description).toBeNull();
    });

    it("should exclude id and projectId from mapped images", () => {
      const project = createMockProjectFull({
        gallery: [createMockGallery()],
      });

      const result = getProjectImages(project);

      expect(result).toHaveLength(1);
      expect(result![0]).not.toHaveProperty("id");
      expect(result![0]).not.toHaveProperty("projectId");
    });

    it("should preserve gallery order", () => {
      const project = createMockProjectFull({
        gallery: [
          createMockGallery({ alt: "First", imageUrl: "https://example.com/first.jpg" }),
          createMockGallery({ alt: "Second", imageUrl: "https://example.com/second.jpg" }),
          createMockGallery({ alt: "Third", imageUrl: "https://example.com/third.jpg" }),
        ],
      });

      const result = getProjectImages(project);

      expect(result![0].alt).toBe("First");
      expect(result![1].alt).toBe("Second");
      expect(result![2].alt).toBe("Third");
    });

    it("should only include alt, description, and imageUrl in output", () => {
      const project = createMockProjectFull({
        gallery: [createMockGallery()],
      });

      const result = getProjectImages(project);

      expect(Object.keys(result![0]).sort()).toEqual([
        "alt",
        "description",
        "imageUrl",
      ]);
    });
  });
});

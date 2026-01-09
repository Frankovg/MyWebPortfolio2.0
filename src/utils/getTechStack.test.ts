import { createMockProjectFull, createMockTech } from "./__mocks__/mocks";
import { getTechStack } from "./getTechStack";

describe("getTechStack", () => {
  describe("when project is undefined", () => {
    it("should return null", () => {
      const result = getTechStack(undefined);
      expect(result).toBeNull();
    });
  });

  describe("when project is provided", () => {
    it("should return empty array when project has no tech stack", () => {
      const project = createMockProjectFull({ techStack: [] });
      const result = getTechStack(project);
      expect(result).toEqual([]);
    });

    it("should map single tech correctly", () => {
      const project = createMockProjectFull({
        techStack: [createMockTech({ value: "react" })],
      });

      const result = getTechStack(project);

      expect(result).toEqual([{ value: "react" }]);
    });

    it("should map multiple techs correctly", () => {
      const project = createMockProjectFull({
        techStack: [
          createMockTech({ id: "tech-1", value: "react" }),
          createMockTech({ id: "tech-2", value: "typescript" }),
          createMockTech({ id: "tech-3", value: "nextjs" }),
        ],
      });

      const result = getTechStack(project);

      expect(result).toEqual([
        { value: "react" },
        { value: "typescript" },
        { value: "nextjs" },
      ]);
    });

    it("should exclude id and name from mapped tech", () => {
      const project = createMockProjectFull({
        techStack: [createMockTech({ id: "tech-1", name: "React", value: "react" })],
      });

      const result = getTechStack(project);

      expect(result).toHaveLength(1);
      expect(result![0]).not.toHaveProperty("id");
      expect(result![0]).not.toHaveProperty("name");
    });

    it("should preserve tech stack order", () => {
      const project = createMockProjectFull({
        techStack: [
          createMockTech({ value: "first" }),
          createMockTech({ value: "second" }),
          createMockTech({ value: "third" }),
        ],
      });

      const result = getTechStack(project);

      expect(result![0].value).toBe("first");
      expect(result![1].value).toBe("second");
      expect(result![2].value).toBe("third");
    });

    it("should only include value property in output", () => {
      const project = createMockProjectFull({
        techStack: [createMockTech()],
      });

      const result = getTechStack(project);

      expect(Object.keys(result![0])).toEqual(["value"]);
    });
  });
});

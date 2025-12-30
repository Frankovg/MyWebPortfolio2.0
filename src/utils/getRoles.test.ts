import { createMockProjectFull, createMockRole } from "./__mocks__/mocks";
import { getRoles } from "./getRoles";

describe("getRoles", () => {
  describe("when project is undefined", () => {
    it("should return null", () => {
      const result = getRoles(undefined);
      expect(result).toBeNull();
    });
  });

  describe("when project is provided", () => {
    it("should return empty array when project has no roles", () => {
      const project = createMockProjectFull({ roles: [] });
      const result = getRoles(project);
      expect(result).toEqual([]);
    });

    it("should map single role correctly", () => {
      const project = createMockProjectFull({
        roles: [
          createMockRole({
            label: "Developer",
            value: "developer",
            percentage: 80,
          }),
        ],
      });

      const result = getRoles(project);

      expect(result).toEqual([
        {
          label: "Developer",
          value: "developer",
          percentage: 80,
        },
      ]);
    });

    it("should map multiple roles correctly", () => {
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

      const result = getRoles(project);

      expect(result).toEqual([
        {
          label: "Developer",
          value: "developer",
          percentage: 60,
        },
        {
          label: "Designer",
          value: "designer",
          percentage: 40,
        },
      ]);
    });

    it("should exclude id and projectId from mapped roles", () => {
      const project = createMockProjectFull({
        roles: [createMockRole()],
      });

      const result = getRoles(project);

      expect(result).toHaveLength(1);
      expect(result![0]).not.toHaveProperty("id");
      expect(result![0]).not.toHaveProperty("projectId");
    });

    it("should preserve role order", () => {
      const project = createMockProjectFull({
        roles: [
          createMockRole({ label: "First", value: "first", percentage: 30 }),
          createMockRole({ label: "Second", value: "second", percentage: 40 }),
          createMockRole({ label: "Third", value: "third", percentage: 30 }),
        ],
      });

      const result = getRoles(project);

      expect(result![0].label).toBe("First");
      expect(result![1].label).toBe("Second");
      expect(result![2].label).toBe("Third");
    });
  });
});

import type { Gallery, Role, Tech } from "@/generated/prisma/client";
import type { IProjectFull } from "@/lib/types";

const mockDate = new Date("2024-01-15T10:00:00Z");

export const createMockGallery = (
  overrides: Partial<Gallery> = {}
): Gallery => ({
  id: "gallery-1",
  imageUrl: "https://example.com/image.jpg",
  alt: "Test image",
  description: "Test description",
  projectId: "test-project-id",
  ...overrides,
});

export const createMockRole = (overrides: Partial<Role> = {}): Role => ({
  id: "role-1",
  label: "Developer",
  value: "developer",
  percentage: 100,
  projectId: "test-project-id",
  ...overrides,
});

export const createMockTech = (overrides: Partial<Tech> = {}): Tech => ({
  id: "tech-1",
  name: "React",
  value: "react",
  ...overrides,
});

export const createMockProjectFull = (
  overrides: Partial<IProjectFull> = {}
): IProjectFull => ({
  id: "test-project-id",
  title: "Test Project",
  slug: "test-project",
  shortDescription: "Short description",
  description: "Full description",
  image: "https://example.com/image.jpg",
  date: mockDate,
  published: true,
  company: "Test Company",
  companyUrl: "https://company.com",
  client: "Test Client",
  clientUrl: "https://client.com",
  repository: "https://github.com/test/repo",
  websiteUrl: "https://project.com",
  videoUrl: "https://youtube.com/video",
  videoTitle: "Project Demo",
  videoDescription: "A demo of the project",
  categoryId: "cat-1",
  createdAt: mockDate,
  updatedAt: mockDate,
  gallery: [createMockGallery()],
  techStack: [createMockTech()],
  roles: [createMockRole()],
  ...overrides,
});

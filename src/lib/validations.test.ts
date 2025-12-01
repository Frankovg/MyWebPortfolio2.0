import { projectFormSchema } from './validations';

const mockedProjectData = {
  title: "Test Project",
  shortDescription: "A test project",
  description: "This is a test project description",
  image: "https://example.com/image.jpg",
  slug: "test-project",
  gallery: [{
    imageUrl: "https://example.com/gallery.jpg",
    alt: "Gallery image",
    description: "Gallery description"
  }],
  date: new Date(),
  techStack: [{ value: "react" }],
  roles: [{
    label: "Developer",
    value: "developer",
    percentage: 100
  }],
  published: true,
  // Optional fields that we're testing
  repository: null,
  websiteUrl: null,
  videoUrl: null,
  videoTitle: null,
  videoDescription: null,
  company: null,
  companyUrl: null,
  client: null,
  clientUrl: null,
};

describe('Project Form URL Validation', () => {
  it('should accept null for optional URL fields', () => {
    const result = projectFormSchema.safeParse(mockedProjectData);
    expect(result.success).toBe(true);
  });

  it('should accept empty string for websiteUrl and transform to null', () => {
    const data = { ...mockedProjectData, websiteUrl: "" };
    const result = projectFormSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.websiteUrl).toBe(null);
    }
  });

  it('should accept valid URL for websiteUrl', () => {
    const data = { ...mockedProjectData, websiteUrl: "https://example.com" };
    const result = projectFormSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.websiteUrl).toBe("https://example.com");
    }
  });

  it('should reject invalid URL for websiteUrl', () => {
    const data = { ...mockedProjectData, websiteUrl: "not-a-url" };
    const result = projectFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid url provided.");
    }
  });

  it('should handle all optional URL fields the same way', () => {
    const urlFields = ['repository', 'websiteUrl', 'videoUrl', 'companyUrl', 'clientUrl'];

    urlFields.forEach(field => {
      const emptyData = { ...mockedProjectData, [field]: "" };
      const emptyResult = projectFormSchema.safeParse(emptyData);
      expect(emptyResult.success).toBe(true);
      if (emptyResult.success) {
        expect(emptyResult.data[field as keyof typeof emptyResult.data]).toBe(null);
      }

      const validData = { ...mockedProjectData, [field]: "https://example.com" };
      const validResult = projectFormSchema.safeParse(validData);
      expect(validResult.success).toBe(true);
      if (validResult.success) {
        expect(validResult.data[field as keyof typeof validResult.data]).toBe("https://example.com");
      }

      const invalidData = { ...mockedProjectData, [field]: "invalid-url" };
      const invalidResult = projectFormSchema.safeParse(invalidData);
      expect(invalidResult.success).toBe(false);
    });
  });

  it('should handle all optional string fields the same way', () => {
    const stringFields = ['videoTitle', 'videoDescription', 'company', 'client'];

    stringFields.forEach(field => {
      const emptyData = { ...mockedProjectData, [field]: "" };
      const emptyResult = projectFormSchema.safeParse(emptyData);
      expect(emptyResult.success).toBe(true);
      if (emptyResult.success) {
        expect(emptyResult.data[field as keyof typeof emptyResult.data]).toBe(null);
      }

      const validData = { ...mockedProjectData, [field]: "Valid content" };
      const validResult = projectFormSchema.safeParse(validData);
      expect(validResult.success).toBe(true);
      if (validResult.success) {
        expect(validResult.data[field as keyof typeof validResult.data]).toBe("Valid content");
      }

      const nullData = { ...mockedProjectData, [field]: null };
      const nullResult = projectFormSchema.safeParse(nullData);
      expect(nullResult.success).toBe(true);
      if (nullResult.success) {
        expect(nullResult.data[field as keyof typeof nullResult.data]).toBe(null);
      }
    });
  });

  it('should handle gallery description field as optional', () => {
    const emptyDescData = {
      ...mockedProjectData,
      gallery: [{
        imageUrl: "https://example.com/gallery.jpg",
        alt: "Gallery image",
        description: ""
      }]
    };
    const emptyDescResult = projectFormSchema.safeParse(emptyDescData);
    expect(emptyDescResult.success).toBe(true);
    if (emptyDescResult.success) {
      expect(emptyDescResult.data.gallery[0].description).toBe(null);
    }

    const validDescData = {
      ...mockedProjectData,
      gallery: [{
        imageUrl: "https://example.com/gallery.jpg",
        alt: "Gallery image",
        description: "Valid description"
      }]
    };
    const validDescResult = projectFormSchema.safeParse(validDescData);
    expect(validDescResult.success).toBe(true);
    if (validDescResult.success) {
      expect(validDescResult.data.gallery[0].description).toBe("Valid description");
    }
  });
});

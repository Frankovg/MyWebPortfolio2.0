import { z } from "zod";

import { FALLBACK_IMG, TECH_STACK_DATA } from "./constants";

const invalid_type_error = "Invalid type provided for this field.";
const invalid_url_error = "Invalid url provided.";
const required_error = "This field cannot be blank.";
const value_too_short_error = "This field is too short.";
const value_too_long_error_10 =
  "This field must not be greater than 10 characters.";
const value_too_long_error_50 =
  "This field must not be greater than 50 characters.";
const value_too_long_error_200 =
  "This field must not be greater than 200 characters.";
const value_too_long_error_1000 =
  "This field must not be greater than 1000 characters.";
const value_too_long_error_2000 =
  "This field must not be greater than 2000 characters.";
const value_too_short_error_10 =
  "Please make sure your message is at least 10 characters long.";
const valid_email_address = "Please enter a valid email address.";

const phoneValidation = new RegExp(
  /^(?:\+?\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/
);

const validTechStackValues = TECH_STACK_DATA.map((tech) => tech.value);

export const contactFormSchema = z
  .object({
    first_name: z
      .string({
        error: (issue) => issue.input === undefined
          ? required_error
          : invalid_type_error
      })
      .trim()
      .min(1, { error: value_too_short_error })
      .max(50, value_too_long_error_50),
    last_name: z
      .string({
        error: (issue) => issue.input === undefined
          ? required_error
          : invalid_type_error
      })
      .trim()
      .min(1, { error: value_too_short_error })
      .max(50, value_too_long_error_50),
    phone: z
      .string()
      .min(6, { error: value_too_short_error })
      .max(16)
      .regex(phoneValidation, { error: "Invalid phone." })
      .optional()
      .or(z.literal("")),
    email: z
      .email({
        error: (issue) => issue.input === undefined
          ? required_error
          : valid_email_address
      })
      .min(1, { error: value_too_short_error }),
    message: z
      .string()
      .trim()
      .min(10, { error: value_too_short_error_10 })
      .max(1000, value_too_long_error_1000),
    privacy_policy: z.boolean()
  })
  .strict();

export type TContactForm = z.infer<typeof contactFormSchema>;

export const emailSchema = z.object({
  email: z
    .email({
      error: (issue) => issue.input === undefined
        ? required_error
        : valid_email_address
    })
    .min(1, { error: value_too_short_error }),
  sendTo: z.string().optional(),
  subject: z.string().min(1, { error: value_too_short_error }),
  text: z
    .string()
    .trim()
    .min(10, { error: value_too_short_error_10 })
    .max(1000),
  html: z.string().optional(),
});

export const authSchema = z.object({
  email: z.email().max(100),
  password: z.string().max(100),
});

export const userIdSchema = z.string().cuid();
export const isActiveSchema = z.boolean();

const techStackSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, { error: required_error })
    .refine((val) => validTechStackValues.includes(val), {
      error: "Value must be one of the following in the list",
    }),
});

const roleSchema = z.object({
  label: z.string().trim().min(1, { error: required_error }),
  value: z.string().trim().min(1, { error: required_error }),
  percentage: z.int().gte(1).lte(100).positive(),
});

const gallerySchema = z.object({
  imageUrl: z.url({ error: invalid_url_error }).trim(),
  alt: z.string().trim().min(1, { error: required_error }),
  description: z
    .string()
    .trim()
    .min(1)
    .max(1000, value_too_long_error_1000)
    .nullable(),
});

export const categoryIdSchema = z.cuid();
export const projectIdSchema = z.cuid();

export const projectFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { error: required_error })
      .max(50, value_too_long_error_50),
    shortDescription: z
      .string()
      .trim()
      .min(1, { error: required_error })
      .max(200, value_too_long_error_200),
    description: z
      .string()
      .trim()
      .min(1, { error: required_error })
      .max(2000, value_too_long_error_2000),
    image: z.url({ error: invalid_url_error }).trim(),
    slug: z.string().trim().min(1, { error: required_error }),
    gallery: z.array(gallerySchema),
    date: z.date(),
    repository: z.url({ error: invalid_url_error }).nullable(),
    websiteUrl: z.url({ error: invalid_url_error }).nullable(),
    videoUrl: z.url({ error: invalid_url_error }).nullable(),
    videoTitle: z.string().trim().max(50, value_too_long_error_50).nullable(),
    videoDescription: z
      .string()
      .trim()
      .max(1000, value_too_long_error_1000)
      .nullable(),
    company: z.string().trim().max(50, value_too_long_error_50).nullable(),
    companyUrl: z.url({ error: invalid_url_error }).nullable(),
    client: z.string().trim().max(50, value_too_long_error_50).nullable(),
    clientUrl: z.url({ error: invalid_url_error }).nullable(),
    techStack: z.array(techStackSchema),
    roles: z.array(roleSchema),
    published: z.boolean(),
  })
  .transform((data) => ({
    ...data,
    image: data.image || FALLBACK_IMG,
  }));

export type TProjectForm = z.infer<typeof projectFormSchema>;

export const downloadIdSchema = z.string().cuid();

export const downloadFormSchema = z
  .object({
    imageUrl: z.url({ error: invalid_url_error }).trim(),
    alt: z.string().trim().min(1, { error: required_error }),
    name: z
      .string()
      .trim()
      .min(1, { error: required_error })
      .max(50, value_too_long_error_50),
    description: z
      .string()
      .trim()
      .min(1, { error: required_error })
      .max(2000, value_too_long_error_2000),
    language: z.string()
      .trim()
      .min(1, { error: required_error })
      .max(10, value_too_long_error_10),
    fileHref: z.url({ error: invalid_url_error }).trim(),
    format: z
      .string()
      .trim()
      .min(1, { error: required_error })
      .max(10, value_too_long_error_10),
    isActive: z.boolean(),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || FALLBACK_IMG,
  }));

export type TDownloadForm = z.infer<typeof downloadFormSchema>;

const passwordSchema = z
  .string()
  .trim()
  .min(8, { error: "Password must be at least 8 characters long" })
  .max(20, { error: "Password must be at most 20 characters long" })
  .refine((password) => /[A-Z]/.test(password), {
    error: "Password must contain one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    error: "Password must contain one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    error: "Password must contain one number",
  })
  .refine((password) => /[^a-zA-Z0-9]/.test(password), {
    error: "Password must contain one special character",
  });

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, { error: required_error }).max(100),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TChangePasswordForm = z.infer<typeof changePasswordFormSchema>;

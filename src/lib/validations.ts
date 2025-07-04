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
      .string({ invalid_type_error, required_error })
      .trim()
      .min(1, { message: value_too_short_error })
      .max(50, value_too_long_error_50),
    last_name: z
      .string({ invalid_type_error, required_error })
      .trim()
      .min(1, { message: value_too_short_error })
      .max(50, value_too_long_error_50),
    phone: z
      .string()
      .min(6, { message: value_too_short_error })
      .max(16)
      .regex(phoneValidation, { message: "Invalid phone." })
      .optional()
      .or(z.literal("")),
    email: z
      .string({ invalid_type_error, required_error })
      .email({ message: valid_email_address })
      .min(1, { message: value_too_short_error }),
    message: z
      .string()
      .trim()
      .min(10, { message: value_too_short_error_10 })
      .max(1000, value_too_long_error_1000),
  })
  .strict();

export type TContactForm = z.infer<typeof contactFormSchema>;

export const emailSchema = z.object({
  email: z
    .string({ invalid_type_error, required_error })
    .email({ message: valid_email_address })
    .min(1, { message: value_too_short_error }),
  sendTo: z.string().optional(),
  subject: z.string().min(1, { message: value_too_short_error }),
  text: z
    .string()
    .trim()
    .min(10, { message: value_too_short_error_10 })
    .max(1000),
  html: z.string().optional(),
});

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export const userIdSchema = z.string().cuid();
export const isActiveSchema = z.boolean();

const techStackSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, { message: required_error })
    .refine((val) => validTechStackValues.includes(val), {
      message: "Value must be one of the following in the list",
    }),
});

const roleSchema = z.object({
  label: z.string().trim().min(1, { message: required_error }),
  value: z.string().trim().min(1, { message: required_error }),
  percentage: z.number().gte(1).lte(100).int().positive().finite(),
});

const gallerySchema = z.object({
  imageUrl: z.string().trim().url({ message: invalid_url_error }),
  alt: z.string().trim().min(1, { message: required_error }),
  description: z
    .string()
    .trim()
    .min(1)
    .max(200, value_too_long_error_200)
    .nullable(),
});

export const categoryIdSchema = z.string().cuid();
export const projectIdSchema = z.string().cuid();

export const projectFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { message: required_error })
      .max(50, value_too_long_error_50),
    shortDescription: z
      .string()
      .trim()
      .min(1, { message: required_error })
      .max(200, value_too_long_error_200),
    description: z
      .string()
      .trim()
      .min(1, { message: required_error })
      .max(2000, value_too_long_error_2000),
    image: z.string().trim().url({ message: invalid_url_error }),
    slug: z.string().trim().min(1, { message: required_error }),
    gallery: z.array(gallerySchema),
    date: z.date().default(() => new Date()),
    repository: z.string().url({ message: invalid_url_error }).nullable(),
    websiteUrl: z.string().url({ message: invalid_url_error }).nullable(),
    videoUrl: z.string().url({ message: invalid_url_error }).nullable(),
    videoTitle: z.string().trim().max(50, value_too_long_error_50).nullable(),
    videoDescription: z
      .string()
      .trim()
      .max(1000, value_too_long_error_1000)
      .nullable(),
    company: z.string().trim().max(50, value_too_long_error_50).nullable(),
    companyUrl: z.string().url({ message: invalid_url_error }).nullable(),
    client: z.string().trim().max(50, value_too_long_error_50).nullable(),
    clientUrl: z.string().url({ message: invalid_url_error }).nullable(),
    techStack: z.array(techStackSchema),
    roles: z.array(roleSchema),
    published: z.boolean().default(true),
  })
  .transform((data) => ({
    ...data,
    image: data.image || FALLBACK_IMG,
  }));

export type TProjectForm = z.infer<typeof projectFormSchema>;

export const downloadIdSchema = z.string().cuid();

export const downloadFormSchema = z
  .object({
    imageUrl: z.string().trim().url({ message: invalid_url_error }),
    alt: z.string().trim().min(1, { message: required_error }),
    name: z
      .string()
      .trim()
      .min(1, { message: required_error })
      .max(50, value_too_long_error_50),
    description: z
      .string()
      .trim()
      .min(1, { message: required_error })
      .max(2000, value_too_long_error_2000),
    fileHref: z.string().trim().url({ message: invalid_url_error }),
    format: z
      .string()
      .trim()
      .min(1, { message: required_error })
      .max(10, value_too_long_error_10),
    isActive: z.boolean().default(false),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || FALLBACK_IMG,
  }));

export type TDownloadForm = z.infer<typeof downloadFormSchema>;

const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password must be at most 20 characters long" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[^a-zA-Z0-9]/.test(password), {
    message: "Password must contain at least one special character",
  });

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, { message: required_error }).max(100),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TChangePasswordForm = z.infer<typeof changePasswordFormSchema>;

import { z } from 'zod'

const invalid_type_error = 'Invalid type provided for this field.'
const required_error = 'This field cannot be blank.'
const value_too_short_error = 'This field is too short.'
const value_too_long_error = 'This field must not be greater than 50 characters.'

const phoneValidation = new RegExp(
  /^(?:\+?\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/
)

export const contactFormSchema = z.object({
  first_name: z.string({ invalid_type_error, required_error }).trim().min(1, { message: value_too_short_error }).max(50, value_too_long_error),
  last_name: z.string({ invalid_type_error, required_error }).trim().min(1, { message: value_too_short_error }).max(50, value_too_long_error),
  phone: z.string().min(6, { message: value_too_short_error }).max(16).regex(phoneValidation, { message: 'Invalid phone.' }).optional().or(z.literal('')),
  email: z.string({ invalid_type_error, required_error }).email({ message: 'Please enter a valid email address.' }).min(1, { message: value_too_short_error }),
  message: z.string().trim().min(10, { message: 'Please make sure your message is at least 10 characters long.' }).max(1000),
}).strict()

export type TContactForm = z.infer<typeof contactFormSchema>

export const emailSchema = z.object({
  email: z.string({ invalid_type_error, required_error }).email({ message: 'Please enter a valid email address.' }).min(1, { message: value_too_short_error }),
  sendTo: z.string().optional(),
  subject: z.string().min(1, { message: value_too_short_error }),
  text: z.string().trim().min(10, { message: 'Please make sure your message is at least 10 characters long.' }).max(1000),
  html: z.string().optional(),
})

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
})

export const userIdSchema = z.string().cuid()
export const isActiveSchema = z.boolean()
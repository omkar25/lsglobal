import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[+]?[\d\s-]{10,15}$/, { message: "Please enter a valid phone number" }),
  subject: z
    .string()
    .max(100, { message: "Subject must be at most 100 characters" })
    .optional(),
  message: z
    .string()
    .max(1000, { message: "Message must be at most 1000 characters" })
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

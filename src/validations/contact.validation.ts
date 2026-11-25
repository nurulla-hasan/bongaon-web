import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Name must be at least 2 characters." }).max(120),
  phone: z.string().trim().min(6, { error: "Valid phone number is required." }).max(30),
  subject: z.string().trim().max(150),
  message: z
    .string()
    .trim()
    .min(5, { error: "Message must be at least 5 characters." })
    .max(2000),
});

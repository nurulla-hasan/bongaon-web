import { z } from "zod";

export const createReviewSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(100),
  location: z.string().trim().max(100),
  phone: z.string().trim().max(30),
  orderNumber: z.string().trim().max(50),
  rating: z
    .number()
    .int()
    .min(1, { error: "Please select a rating." })
    .max(5),
  comment: z
    .string()
    .trim()
    .min(5, { error: "Comment must be at least 5 characters." })
    .max(1000),
});

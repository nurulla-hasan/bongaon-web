import { z } from "zod";

export const checkoutSchema = z.object({
  receiverName: z.string().trim().min(2, { error: "Receiver name is required." }),
  receiverPhone: z
    .string()
    .trim()
    .min(6, { error: "Valid receiver phone is required." })
    .max(30),
  district: z.string().trim().min(2, { error: "District is required." }).max(100),
  fullAddress: z
    .string()
    .trim()
    .min(5, { error: "Full address is required." })
    .max(500),
  whatsappNumber: z.string().trim().max(30),
  orderNote: z.string().trim().max(500),
});

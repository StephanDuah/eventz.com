import * as z from "zod";
export const EventFormSchema = z.object({
  title: z.string().min(3, "Event title should not be less than 3 characters"),
  description: z
    .string()
    .min(3, "description should not be less than 3 characters")
    .max(400, "description should not be more than 400 characters"),
  location: z.string().min(3, "location should not be less than 3 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

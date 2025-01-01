import { z } from "zod";



export const buySchema = (amountType: string, amountMin: number, amountMax: number) => {
  return z.object({
      recipient_name: z.string().min(1, "Enter recipient name"),
      sender_name: z.string().min(1, "Enter your name"),
      recipient_email: z
          .string()
          .min(1, { message: "Email cannot be empty" })
          .email("This is not a valid email."),
          recipient_phone_number: z.string().min(1, "Enter recipient phone number"),
      amount: amountType === "fixed"
          ? z.string().min(1, "Amount is required")
          : z.preprocess(
              (value) => (value ? parseFloat(value as string) : undefined),
              z
                  .number()
                  .min(amountMin, `Amount must be at least ${amountMin}`)
                  .max(amountMax, `Amount cannot exceed ${amountMax}`)
          ),
      quantity: z.string(),
      message: z.string().min(1, "Message cannot be empty"),
  });
};

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
export const sellSchema = z.object({
  sub_category: z.string().min(1, "Sub category is required"),
  amount: z.string().min(1, "Amount is required"),
  image: z
    .any()
    .refine(
      (file) => file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type),
      "Only JPEG, PNG, or WEBP images are allowed"
    )
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, "File size must be less than 2MB"),
});



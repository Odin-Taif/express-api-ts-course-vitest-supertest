import { z } from "zod";

// Name validation: Ensure name is between 3 and 40 characters and is not empty
const nameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(40, "Name must be at most 40 characters long");

// Email validation: Ensure the email is valid
const emailSchema = z.string().email("Correct email is required");

// Password validation: Ensure password is between 8 and 40 characters, has one uppercase letter, and one special character
const passwordSchema = z
  .string()
  .min(8, "Your password should be at least 8 characters!")
  .max(40, "Your password should be at most 40 characters!")
  .refine(
    (val) => /[A-Z]/.test(val),
    "Your password must contain at least one uppercase letter!"
  )
  .refine(
    (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
    "Your password must contain at least one special character!"
  );

export const userSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

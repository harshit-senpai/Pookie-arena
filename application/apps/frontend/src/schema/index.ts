import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3, {
    message: "username must be atleast 3 characters long",
  }),
  email: z.string().email({
    message: "Please provide a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 characters long",
  }),
});

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 characters long",
  }),
});

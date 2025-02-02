import { SignInSchema, SignUpSchema } from "@/schema";
import { z } from "zod";

export const apiClient = {
  async signUp(payload: { data: z.infer<typeof SignUpSchema> }) {
    try {
      const response = await fetch("http://localhost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async signIn(data: z.infer<typeof SignInSchema>) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const userData = await res.json();

      return userData;
    } catch (error) {
      console.log(error);
    }
  },
};

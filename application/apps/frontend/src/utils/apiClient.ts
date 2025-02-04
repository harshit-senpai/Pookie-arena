import { SignInSchema, SignUpSchema } from "@/schema";
import { z } from "zod";

export type QuizQuestion = {
  id: string;
  text: string;
};

export type QuizResponse = {
  questionId: string;
  score: number;
};

export type QuizSubmission = {
  responses: QuizResponse[];
  gender: string;
};

export const apiClient = {
  async signUp(payload: { data: z.infer<typeof SignUpSchema> }) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  },
  async signIn(data: z.infer<typeof SignInSchema>) {
    try {
      const res = await fetch("http://localhost:8080/api/v1/signin", {
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
  getQuizQuestions: async (page: number) => {
    const res = await fetch(
      `http://localhost:8080/api/v1/quiz/questions?page=${page}`
    );
    const data = await res.json();
    return {
      questions: data.questions,
      totalQuestions: data.totalQuestions,
    };
  },

  submitQuiz: async (data: QuizSubmission) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          response: data.responses, // Match backend schema field name
          gender: data.gender,
        }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

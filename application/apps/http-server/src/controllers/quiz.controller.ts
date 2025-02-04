import { Request, Response } from "express";
import client from "@repo/db/client";
import z from "zod";

declare global {
  namespace Express {
    export interface Request {
      role?: "admin" | "user";
      userId?: string;
    }
  }
}

const submitQuestionSchema = z.object({
  response: z.array(
    z.object({
      questionId: z.string(),
      score: z.number().min(0).max(5),
    })
  ),
  gender: z.enum(["male", "female", "other"]),
});

const DIMENSION_MAP: { [key: string]: string } = {
  extraversion: "extraversion",
  openness: "openness",
  agreeableness: "agreeableness",
  conscientiousness: "conscientiousness",
  neuroticism: "neuroticism",
};

export const getQuizQuestions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 5;

    const questions = await client.quizQuestion.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        questionText: true,
      },
    });

    res.json({
      questions: questions.map((q) => ({ id: q.id, text: q.questionText })),
      totalQuestions: await client.quizQuestion.count(),
      currentPage: page,
    });
  } catch (error) {
    console.log("[GET_QUIZ_QUESTIONS_ERROR]: ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const submitQuizResponse = async (req: Request, res: Response) => {
  try {
    const parsedData = submitQuestionSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const { response, gender } = parsedData.data;
    const userId = req.userId!;

    // Calculate personality scores
    const scores: Record<string, number> = {};
    for (const res of response) {
      const question = await client.quizQuestion.findUnique({
        where: { id: res.questionId },
        select: { dimension: true, polarity: true },
      });

      if (question) {
        const dimension = DIMENSION_MAP[question.dimension];
        const adjustedScore = res.score * question.polarity;
        scores[dimension] = (scores[dimension] || 0) + adjustedScore;
      }
    }

    // Normalize scores to percentages
    const maxPossible = response.length * 5;
    const personalityScores = {
      extraversion: (scores.extraversion / maxPossible) * 100 || 0,
      openness: (scores.openness / maxPossible) * 100 || 0,
      agreeableness: (scores.agreeableness / maxPossible) * 100 || 0,
      conscientiousness: (scores.conscientiousness / maxPossible) * 100 || 0,
      neuroticism: (scores.neuroticism / maxPossible) * 100 || 0,
      gender,
    };

    // Save to database
    await client.userPersonality.upsert({
        where: { userId },
        update: {
          extraversion: personalityScores.extraversion,
          openness: personalityScores.openness,
          agreeableness: personalityScores.agreeableness,
          conscientiousness: personalityScores.conscientiousness,
          neuroticism: personalityScores.neuroticism,
          gender: personalityScores.gender,
          updatedAt: new Date()
        },
        create: {
          userId,
          extraversion: personalityScores.extraversion,
          openness: personalityScores.openness,
          agreeableness: personalityScores.agreeableness,
          conscientiousness: personalityScores.conscientiousness,
          neuroticism: personalityScores.neuroticism,
          gender: personalityScores.gender,
        }
      });

    res.json(personalityScores);
  } catch (error) {
    console.error("[SUBMIT_QUIZ_ERROR]:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

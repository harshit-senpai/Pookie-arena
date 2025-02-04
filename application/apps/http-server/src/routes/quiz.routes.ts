import { Router } from "express";
import {
  getQuizQuestions,
  submitQuizResponse,
} from "../controllers/quiz.controller";
import { requireUser } from "../middleware/user";

const quizRouter = Router();

quizRouter.get("/questions", getQuizQuestions);
quizRouter.post("/submit", requireUser, (req, res, next) => {
  submitQuizResponse(req, res).catch(next);
});

export default quizRouter;

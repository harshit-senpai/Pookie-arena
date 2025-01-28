declare global {
  namespace Express {
    export interface Request {
      role?: "admin" | "user";
      userId?: string;
    }
  }
}

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      role: string;
      userId: string;
    };
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("[USER_MIDDLEWARE_ERROR]: ", error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

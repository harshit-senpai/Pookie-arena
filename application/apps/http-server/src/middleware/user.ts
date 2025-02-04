import { NextFunction, Request, Response } from "express";
import { getCurrentUser } from "../utils/currentUser";

type UserPayload = {
  id: string;
  username: string;
  email: string;
  password: string;
  personalityType?: string | null;
  createdAt: Date;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Use custom type instead of Prisma client
    }
  }
}

export async function requireUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await getCurrentUser(req);

    console.log(user);

    if (!user) {
      res.status(401).json({
        message: "Unauthorized - Please login",
      });
      return;
    }

    req.userId = user.id;  
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
}

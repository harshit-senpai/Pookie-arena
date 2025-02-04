import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../types";
import client from "@repo/db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, EXPIRES_IN, JWT_COOKIE_EXPIRES_IN } from "../config";

const signToken = (id: string) => {
  const secret = JWT_SECRET as string;

  return jwt.sign({ id }, secret, {
    expiresIn: `${EXPIRES_IN}d`,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  res: Response,
  message: string
) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "lax" as "lax",
  };

  res.cookie("token", token, cookieOptions);

  res.status(statusCode).json({
    token,
    message,
    status: 201,
    data: {
      user,
    },
  });
};

export const Signup = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const parsedData = signupSchema.safeParse(data);

    if (!parsedData?.success) {
      const errorMessages = parsedData.error.issues
        .map((issue) => issue.message)
        .join(", ");

      res.status(400).json({
        message: errorMessages,
      });
      return;
    }

    console.log(parsedData.data);

    const existingUser = await client.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      res.status(400).json({
        message: "user already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const newUser = await client.user.create({
      data: {
        username: parsedData.data.username,
        email: parsedData.data.email,
        password: hashedPassword,
      },
    });

    createSendToken(newUser, 201, res, "user created");
  } catch (error) {
    console.log("[SIGIN_UP_ERROR]", error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try{

  } catch (error) {
    console.log("[SIGIN_IN_ERROR]", error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

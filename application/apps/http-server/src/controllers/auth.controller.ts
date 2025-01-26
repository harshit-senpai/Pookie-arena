import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../types";
import client from "@repo/db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const Signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
      console.log(parsedData);
      res.status(400).json({ message: "Validation Failed" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });

    res.json({
      userId: user.id,
    });
  } catch (error) {
    console.log("[SIGNUP_ERROR]: ", error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
      res.status(400).json({ message: "Validation Failed" });
      return;
    }

    const user = await client.user.findUnique({
      where: {
        username: parsedData.data.username,
      },
    });

    if (!user) {
      res.status(403).json({ message: "Invalid Credentials" });
      return;
    }

    const isValid = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!isValid) {
      res.status(403).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } catch (error) {
    console.log("[SIGNIN_ERROR]: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

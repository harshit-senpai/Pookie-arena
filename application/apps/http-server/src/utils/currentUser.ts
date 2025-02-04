import jwt from "jsonwebtoken";
import { Request } from "express";
import client from "@repo/db/client";
import { JWT_SECRET } from "../config";

export async function getCurrentUser(req: Request) {
  try {
    const token =
      req.headers.authorization?.replace("Bearer ", "") ||
      req?.cookies?.token ||
      "";
    console.log(token);

    if (!token) {
      return null;
    }

    const decoded = (await jwt.verify(
      token,
      JWT_SECRET as string
    )) as { id: string };

    const currentUser = await client.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    return currentUser;
  } catch (error) {
    console.log("[GET_CURRENT_USER]", error);
    return null;
  }
}

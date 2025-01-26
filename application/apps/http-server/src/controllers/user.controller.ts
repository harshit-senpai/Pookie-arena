import { Request, Response } from "express";
import { updateMetaData } from "../types";
import client from "@repo/db/client";

export const userMetaData = async (req: Request, res: Response) => {
  try {
    const parsedData = updateMetaData.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Validation Failed" });
      return;
    }

    await client.user.update({
      where: {
        id: parsedData.data.avatarId,
      },
      data: {
        avatarId: parsedData.data.avatarId,
      },
    });

    res.json({ message: "Metadata  Updated" });
  } catch (error) {
    console.log("[USER_META_DATA_ERROR]: ", error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const userMetaDataBulk = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

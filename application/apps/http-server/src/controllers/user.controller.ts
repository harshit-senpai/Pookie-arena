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
    const userIdString = (req.query.ids ?? "[]") as string;
    const userIds = userIdString.slice(1, userIdString?.length - 2).split(",");

    const metaData = await client.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        avatar: true,
        id: true,
      },
    });

    res.json({
      avatars: (await metaData).map((m) => ({
        userId: m,
        avatarId: m.avatar?.imageUrl
      }) )
    })
  } catch (error) {}
};

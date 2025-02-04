// import client from "@repo/db/client";
// import { Request, Response } from "express";
// import {
//   CreateAvatarSchema,
//   CreateElementSchema,
//   CreateMapSchema,
//   UpdateElementSchema,
// } from "../types";

// export const createElement = async (req: Request, res: Response) => {
//   try {
//     const parsedData = CreateElementSchema.safeParse(req.body);

//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation Failed" });
//       return;
//     }

//     const element = await client.element.create({
//       data: {
//         width: parsedData.data.width,
//         height: parsedData.data.height,
//         imageUrl: parsedData.data.imageUrl,
//         static: parsedData.data.static,
//       },
//     });

//     res.json({ id: element.id });
//     return;
//   } catch (error) {
//     console.log("[ADD_ELEMENT_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const updateElement = async (req: Request, res: Response) => {
//   try {
//     const parsedData = UpdateElementSchema.safeParse(req.body);

//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation Failed" });
//       return;
//     }

//     await client.element.update({
//       where: {
//         id: req.params.elementId,
//       },
//       data: {
//         imageUrl: parsedData.data.imageUrl,
//       },
//     });

//     res.json({ message: "Element Updated" });
//   } catch (error) {
//     console.log("[UPDATE_ELEMENT_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const createAvatar = async (req: Request, res: Response) => {
//   try {
//     const parsedData = CreateAvatarSchema.safeParse(req.body);

//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation Failed" });
//       return;
//     }

//     const avatar = await client.avatar.create({
//       data: {
//         name: parsedData.data.name,
//         imageUrl: parsedData.data.imageUrl,
//       },
//     });

//     res.json({ id: avatar.id });
//   } catch (error) {
//     console.log("[CREATE_AVATAR_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const createMap = async (req: Request, res: Response) => {
//   try {
//     const parsedData = CreateMapSchema.safeParse(req.body);

//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation Failed" });
//       return;
//     }

//     const map = await client.map.create({
//       data: {
//         name: parsedData.data.name,
//         width: parseInt(parsedData.data.dimensions.split("x")[0]),
//         height: parseInt(parsedData.data.dimensions.split("y")[1]),
//         thumbnail: parsedData.data.thumbnail,
//         MapElements: {
//           create: parsedData.data.defaultElements.map((e) => ({
//             elementId: e.elementId,
//             x: e.x,
//             y: e.y,
//           })),
//         },
//       },
//     });

//     res.json({ id: map.id });
//   } catch (error) {
//     console.log("[CREATE_MAP_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// import { Request, Response } from "express";
// import client from "@repo/db/client";
// import {
//   AddElementSchema,
//   CreateElementSchema,
//   CreateSpaceSchema,
//   DeleteElementSchema,
// } from "../types";

// export const createSpace = async (req: Request, res: Response) => {
//   try {
//     const parsedData = CreateSpaceSchema.safeParse(req.body);

//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation Failed" });
//       return;
//     }

//     if (!parsedData.data.mapId) {
//       await client.space.create({
//         data: {
//           name: parsedData.data.name,
//           width: parseInt(parsedData.data.dimensions.split("x")[0]),
//           height: parseInt(parsedData.data.dimensions.split("y")[1]),
//           creatorId: req.userId!,
//         },
//       });
//       res.json({ message: "Space Created" });
//       return;
//     }

//     const map = await client.map.findUnique({
//       where: {
//         id: parsedData.data.mapId,
//       },
//       select: {
//         MapElements: true,
//         width: true,
//         height: true,
//       },
//     });

//     if (!map) {
//       res.status(400).json({ message: "Map not found" });
//       return;
//     }

//     let space = await client.$transaction(async () => {
//       const space = await client.space.create({
//         data: {
//           name: parsedData.data.name,
//           width: map?.width!,
//           height: map?.height,
//           creatorId: req.userId!,
//         },
//       });

//       await client.spaceElements.createMany({
//         data: map.MapElements.map((e) => ({
//           spaceId: space.id,
//           elementId: e.elementId,
//           x: e.x!,
//           y: e.y!,
//         })),
//       });

//       return space;
//     });

//     res.json({ spaceId: space.id });
//   } catch (error) {
//     console.log("[CREATE_SPACE_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const deleteSpace = async (req: Request, res: Response) => {
//   try {
//     const space = await client.space.findUnique({
//       where: {
//         id: req.params.spaceId,
//       },
//       select: {
//         creatorId: true,
//       },
//     });

//     if (!space) {
//       res.status(400).json({ message: "Space not found" });
//       return;
//     }

//     if (space.creatorId !== req.userId) {
//       res.status(403).json({ message: "Unauthorized" });
//       return;
//     }

//     await client.space.delete({
//       where: {
//         id: req.params.spaceId,
//       },
//     });

//     res.json({ message: "Space Deleted" });
//   } catch (error) {
//     console.log("[DELETE_SPACE_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const getAllSpaces = async (req: Request, res: Response) => {
//   try {
//     const spaces = await client.space.findMany({
//       where: {
//         creatorId: req.userId!,
//       },
//     });

//     res.json({
//       spaces: spaces.map((s) => ({
//         id: s.id,
//         name: s.name,
//         thumbnail: s.thumbnail,
//         dimensions: `${s.width}x${s.height}`,
//       })),
//     });
//   } catch (error) {
//     console.log("[GET_ALL_SPACES_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const addElementToSpace = async (req: Request, res: Response) => {
//   try {
//     const parsedData = AddElementSchema.safeParse(req.body);

//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation Failed" });
//       return;
//     }

//     const space = await client.space.findUnique({
//       where: {
//         id: req.params.spaceId,
//         creatorId: req.userId!,
//       },
//       select: {
//         width: true,
//         height: true,
//       },
//     });

//     if (!space) {
//       res.status(400).json({ message: "Space not found" });
//       return;
//     }

//     await client.spaceElements.create({
//       data: {
//         spaceId: req.body.spaceId,
//         elementId: req.body.elementId,
//         x: req.body.x,
//         y: req.body.y,
//       },
//     });

//     res.json({ message: "Element Added" });
//   } catch (error) {
//     console.log("[ADD_ELEMENT_TO_SPACE_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const deleteElementFromSpace = async (req: Request, res: Response) => {
//   try {
//     const parsedData = DeleteElementSchema.safeParse(req.body);
//     if (!parsedData.success) {
//       res.status(400).json({ message: "Validation Failed" });
//       return;
//     }

//     const spaceElement = await client.spaceElements.findUnique({
//       where: {
//         id: parsedData.data.id,
//       },
//       include: {
//         space: true,
//       },
//     });

//     if (
//       !spaceElement?.space.creatorId ||
//       spaceElement.space.creatorId !== req.userId
//     ) {
//       res.status(403).json({ message: "Unauthorized" });
//       return;
//     }

//     await client.spaceElements.delete({
//       where: {
//         id: parsedData.data.id,
//       },
//     });

//     res.json({ message: "Element Deleted" });
//   } catch (error) {
//     console.log("[DELETE_ELEMENT_FROM_SPACE_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

// export const getSpaceById = async (req: Request, res: Response) => {
//   try {
//     const space = await client.space.findUnique({
//       where: {
//         id: req.params.spaceId,
//       },
//       include: {
//         elements: {
//           include: {
//             element: true,
//           },
//         },
//       },
//     });

//     if (!space) {
//       res.status(400).json({ message: "Space not found" });
//       return;
//     }

//     res.json({
//       dimensions: `${space.width}x${space.height}`,
//       elements: space.elements.map((e) => ({
//         id: e.id,
//         element: {
//           id: e.element.id,
//           imageUrl: e.element.imageUrl,
//           width: e.element.width,
//           height: e.element.height,
//           static: e.element.static,
//         },
//         x: e.x,
//         y: e.y,
//       })),
//     });
//   } catch (error) {
//     console.log("[GET_SPACE_BY_ID_ERROR]: ", error);
//     res.status(400).json({ message: "Internal Server Error" });
//   }
// };

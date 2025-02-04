// import client from "@repo/db/client";
import { Request, Response, Router } from "express";
// import adminRouter from "./admin.routes";
// import spaceRouter from "./space.routes";
import userRouter from "./user.routes";
import { signin, Signup } from "../controllers/auth.controller";
import quizRouter from "./quiz.routes";
export const router = Router();

router.route("/signup").post(Signup);
router.use("/quiz", quizRouter);
router.route("/signin").post(signin);

// router.route("/element").get(async (req: Request, res: Response) => {
//   const elements = await client.element.findMany();
//   res.json({
//     elements: elements.map((element) => ({
//       id: element.id,
//       imageUrl: element.imageUrl,
//       width: element.width,
//       height: element.height,
//       static: element.static,
//     })),
//   });
// });

// router.route("/avatar").get(async (req: Request, res: Response) => {
//   const avatars = await client.avatar.findMany();
//   res.json({
//     avatars: avatars.map((avatar) => ({
//       id: avatar.id,
//       name: avatar.name,
//       imageUrl: avatar.imageUrl,
//     })),
//   });
// });

// router.use("/admin", adminRouter);
// router.use("/space", spaceRouter);
router.use("/user", userRouter);

export default router;

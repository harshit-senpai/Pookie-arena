import { Router } from "express";
import adminRouter from "./admin.routes";
import spaceRouter from "./space.routes";
import userRouter from "./user.routes";
import { signin, Signup } from "../controllers/auth.controller";
export const router = Router();

router.route("/signup").post(Signup);

router.route("/signin").post(signin);

router.use("/admin", adminRouter);
router.use("/space", spaceRouter);
router.use("/user", userRouter);

export default router;

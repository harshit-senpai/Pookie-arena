import { Router } from "express";
import adminRouter from "./admin.routes";
import spaceRouter from "./space.routes";
import userRouter from "./user.routes";
export const router = Router();

router.get("/signup", async (req, res) => {
  res.json("Sign Up");
});

router.get("/signin", async (req, res) => {
  res.json("Sign In");
});

router.use("/admin", adminRouter);
router.use("/space", spaceRouter);
router.use("/user", userRouter);

export default router;

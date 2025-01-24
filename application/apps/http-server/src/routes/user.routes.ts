import { Router } from "express";

const userRouter = Router();

userRouter.route("/metaData").post();

userRouter.route("/metaData/bulk").get();

export default userRouter;

import { Router } from "express";
import { userMetaData, userMetaDataBulk } from "../controllers/user.controller";
import { userMiddleware } from "../middleware/user";

const userRouter = Router();

userRouter.route("/metaData").post(userMiddleware, userMetaData);

userRouter.route("/metaData/bulk").get(userMetaDataBulk);

export default userRouter;

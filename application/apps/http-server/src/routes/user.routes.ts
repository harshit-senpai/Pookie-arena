import { Router } from "express";
import { getUser } from "../controllers/user.controller";
// import { userMiddleware } from "../middleware/user";

const userRouter = Router();

userRouter.route("/").post(getUser);

// userRouter.route("/metaData").post(userMiddleware, userMetaData);

// userRouter.route("/metaData/bulk").get(userMetaDataBulk);

export default userRouter;

import { Router } from "express";

const adminRouter = Router();

adminRouter.route("/element").get();

adminRouter.route("/element/:elementId").put();

adminRouter.route("/avatar").get();

adminRouter.route("/map").get();

export default adminRouter;

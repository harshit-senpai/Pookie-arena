import { Router } from "express";

const spaceRouter = Router();

spaceRouter.route("/").post();

spaceRouter.route("/:spaceId").delete();

spaceRouter.route("/all").get();

spaceRouter.route("/element").post();

spaceRouter.route("/element").delete();

spaceRouter.route("/:spaceId").get()

export default spaceRouter;

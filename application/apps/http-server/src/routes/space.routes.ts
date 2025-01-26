import { Router } from "express";
import {
  addElementToSpace,
  createSpace,
  deleteElementFromSpace,
  deleteSpace,
  getAllSpaces,
  getSpaceById,
} from "../controllers/space.controller";
import { userMiddleware } from "../middleware/user";

const spaceRouter = Router();

spaceRouter.use(userMiddleware);

spaceRouter.route("/").post(createSpace);

spaceRouter.route("/:spaceId").delete(deleteSpace);

spaceRouter.route("/all").get(getAllSpaces);

spaceRouter.route("/element").post(addElementToSpace);

spaceRouter.route("/element").delete(deleteElementFromSpace);

spaceRouter.route("/:spaceId").get(getSpaceById);

export default spaceRouter;

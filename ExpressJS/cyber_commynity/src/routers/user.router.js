import express from "express";
import { userController } from "../controller/user.controller";
import protect from "../common/middlewares/protect.middleware";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post("/", userController.create);
userRouter.get("/", protect, userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);

export default userRouter;

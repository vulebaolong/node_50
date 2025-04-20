import express from "express";
import { userController } from "../controller/user.controller";
import protect from "../common/middlewares/protect.middleware";
import uploadLocal from "../common/multer/local.multer";
import productLocal from "../common/multer/product.multer";

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post("/", userController.create);
userRouter.get("/", protect, userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);

userRouter.post("/avatar-local", protect, uploadLocal.single("avatar"), userController.avatarLocal);
userRouter.post("/product-local", protect, productLocal.single("product"), userController.avatarLocal);

export default userRouter;

import express from "express";
import articleController from "../controller/article.controller";
import protect from "../common/middlewares/protect.middleware";
import checkPermission from "../common/middlewares/check-permision.middleware";

const articleRouter = express.Router();

articleRouter.get("/", protect, checkPermission, articleController.findAll);

export default articleRouter;

import express from 'express';
import articleController from '../controller/article.controller';
import protect from '../common/middlewares/protect.middleware';

const articleRouter = express.Router()

articleRouter.get("/", protect, articleController.findAll)


export default articleRouter
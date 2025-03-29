import express from 'express';
import articleController from '../controller/article.controller';

const articleRouter = express.Router()

articleRouter.get("/", articleController.findAll)


export default articleRouter
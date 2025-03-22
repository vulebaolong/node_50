import { responseSuccess } from "../common/helpers/reponse.helper";
import demoService from "../services/demo.service";

const demoController = {
   query: (request, response, next) => {
      const result = demoService.query();
      response.json(result);
   },
   helloWord: (request, response, next) => {
      const result = demoService.helloWord();
      response.json(result);
   },
   checkServer: (request, response, next) => {
      const result = demoService.checkServer();
      response.json(result);
   },
   param: (req, res, next) => {
      const result = demoService.param(req, res, next);
      res.json(result);
   },
   headers: (req, res, next) => {
      const reuslt = demoService.headers(req, res, next);
      res.json(reuslt);
   },
   body: (req, res, next) => {
      const result = demoService.body(req, res, next);
      res.json(result);
   },
   mysql2: async (req, res, next) => {
      const result = await demoService.mysql2(req, res, next);
      res.json(result);
   },
   sequelize: async (req, res, next) => {
      const result = await demoService.sequelize(req, res, next);
      res.json(result);
   },
   prisma: async (req, res, next) => {
      const result = await demoService.prisma(req, res, next);
      const response = responseSuccess(result, `Lấy danh sách user thành công`);
      res.status(response.statusCode).json(response);
   },
};

export default demoController;

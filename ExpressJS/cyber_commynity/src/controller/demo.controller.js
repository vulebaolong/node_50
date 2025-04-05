import {
  responseError,
  responseSuccess,
} from "../common/helpers/reponse.helper";
import demoService from "../services/demo.service";

const demoController = {
  query: async (req, res, next) => {
    try {
      const result = await demoService.query(req, res, next);
      const response = responseSuccess(result, `Lấy querythành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  helloWord: async (req, res, next) => {
    try {
      const result = await demoService.helloWord(req, res, next);
      const response = responseSuccess(result, `helloWord thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  checkServer: async (req, res, next) => {
    try {
      const result = await demoService.checkServer(req, res, next);
      const response = responseSuccess(result, `checkServer thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  param: async (req, res, next) => {
    try {
      const result = await demoService.param(req, res, next);
      const response = responseSuccess(result, `Lấy param thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  headers: async (req, res, next) => {
    try {
      const result = await demoService.headers(req, res, next);
      const response = responseSuccess(result, `Lấy headers thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  body: async (req, res, next) => {
    try {
      const result = await demoService.body(req, res, next);
      const response = responseSuccess(result, `Lấy bodythành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  mysql2: async (req, res, next) => {
    try {
      const result = await demoService.mysql2(req, res, next);
      const response = responseSuccess(result, `Lấy mysql2 thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  sequelize: async (req, res, next) => {
    try {
      const result = await demoService.sequelize(req, res, next);
      const response = responseSuccess(result, `sequelize thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  prisma: async (req, res, next) => {
    try {
      const result = await demoService.prisma(req, res, next);
      const response = responseSuccess(result, `prisma thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  middleware: async (req, res, next) => {
    try {
      const result = await demoService.middleware(req, res, next);
      const response = responseSuccess(result, `middleware thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  sendEmail: async (req, res, next) => {
    const requestData = req.body;

    const data = {
      from: requestData.from,
      to: requestData.to,
      subject: requestData.subject,
      text: requestData.text,
      html: requestData.html,
    };

    try {
      const result = await demoService.sendEmail(data);
      const response = responseSuccess(result, `sendEmail thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default demoController;

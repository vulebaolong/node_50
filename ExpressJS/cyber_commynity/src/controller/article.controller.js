import { responseSuccess } from "../common/helpers/reponse.helper";
import articleService from "../services/article.service";

const articleController = {
   findAll: async (req, res, next) => {
      try {
         const result = await articleService.findAll(req);
         const response = responseSuccess(result, `Lấy article thành công`);
         res.status(response.statusCode).json(response);
      } catch (error) {
         next(error);
      }
   },
};

export default articleController;

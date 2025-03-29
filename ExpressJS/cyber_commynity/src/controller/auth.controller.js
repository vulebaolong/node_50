import { responseSuccess } from "../common/helpers/reponse.helper";
import authService from "../services/auth.service";


const authController = {
   register: async (req, res, next) => {
      try {
         const result = await authService.register(req);
         const response = responseSuccess(result, `Đăng ký thành công`);
         res.status(response.statusCode).json(response);
      } catch (error) {
         next(error);
      }
   }
}

export default authController
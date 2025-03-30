import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET } from "../common/constant/app.constant";

const tokenService = {
   createTokens: (userId) => {
      const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
      return { accessToken };
   },
};

export default tokenService;

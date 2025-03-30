import { ACCESS_TOKEN_SECRET } from "../constant/app.constant";
import { UnAuthorizedException } from "../helpers/exception.helper";
import jwt from "jsonwebtoken";
import prisma from "../prisma/init.prisma";

const protect = async (req, res, next) => {
   try {
      const [type, token] = req.headers.authorization?.split(" ");
      if (!token) throw new UnAuthorizedException(`Không có token`);

      const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);
      console.log(decode);

      const user = await prisma.users.findUnique({
         where: {
            id: decode.userId,
         },
      });

      req.user = user;

      next();
   } catch (error) {
      next(error);
   }
};

export default protect;

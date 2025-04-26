import { ACCESS_TOKEN_SECRET } from "../constant/app.constant";
import { UnAuthorizedException } from "../helpers/exception.helper";
import jwt from "jsonwebtoken";
import prisma from "../prisma/init.prisma";

const protect = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization || "";
      const [type, token] = authHeader.split(" ");
      if (!token) throw new UnAuthorizedException(`Không có token`);
      if (type !== "Bearer") throw new UnAuthorizedException(`Loại token không hợp lệ`);

      const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);
      console.log(decode);

      const user = await prisma.users.findUnique({
         where: {
            id: decode.userId,
         },
         include: {
            Roles: true,
         },
      });

      if (!user) {
         throw new UnAuthorizedException(`Không tìm thấy user`);
      }

      req.user = user;

      next();
   } catch (error) {
      next(error);
   }
};

export default protect;

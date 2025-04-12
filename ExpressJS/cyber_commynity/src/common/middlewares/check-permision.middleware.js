import { BadRequestException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma";

const checkPermission = async (req, res, next) => {
   try {
      const user = req.user;
      const roleId = user.roleId;

      // nếu mà là admin cho pass qua
      if (roleId === 1) {
         next();
         return;
      }

      // 1 - endpoint người dùng gọi
      const routerPath = req.route.path;
      const baseUrl = req.baseUrl;
      const endpoint = `${baseUrl}${routerPath}`;
      const method = req.method;
      // console.log({ endpoint, method, roleId });

      const isPermission = await prisma.rolePermission.findFirst({
         where: {
            roleId: roleId,
            Roles: {
               isActive: true,
            },
            Permissions: {
               endpoint: endpoint,
               method: method,
            },
            isActive: true,
         },
      });

      if (isPermission === null) {
         throw new BadRequestException(`Không có quyện truy cập với endpoint này`);
      }

      console.log({ isPermission });

      next();
   } catch (error) {
      next(error);
   }
};

export default checkPermission;

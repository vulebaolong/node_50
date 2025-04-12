import prisma from "../common/prisma/init.prisma";

export const roleService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      let { page, pageSize, name } = req.query;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;
      name = name || ``;

      console.log({ page, pageSize });

      const skip = (page - 1) * pageSize;

      const where = { name: { contains: name } };
      const articles = await prisma.roles.findMany({
         skip: skip,
         take: pageSize,
         orderBy: { createdAt: "desc" },
         where: where,
      });

      const totalItem = await prisma.roles.count({
         where: where,
      });
      const totalPage = Math.ceil(totalItem / pageSize);

      return {
         page: page,
         pageSize: pageSize,
         totalItem: totalItem,
         totalPage: totalPage,
         items: articles || [],
      };
   },

   findOne: async function (req) {
      const role = await prisma.roles.findUnique({
         where: {
            id: +req.params.id,
         },
      });
      return role;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} role`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} role`;
   },

   togglePermission: async function (req) {
      console.log(req.body);

      const { permissionId, roleId } = req.body;

      let rolePermissionExist = await prisma.rolePermission.findFirst({
         where: {
            permissionId: permissionId,
            roleId: roleId,
         },
      });

      if (rolePermissionExist) {
         // Đã tồn tại
         rolePermissionExist = await prisma.rolePermission.update({
            where: {
               id: rolePermissionExist.id,
            },
            data: {
               isActive: !rolePermissionExist.isActive,
            },
         });
      } else {
         // Chưa tồn tại
         rolePermissionExist = await prisma.rolePermission.create({
            data: {
               permissionId: permissionId,
               roleId: roleId,
               isActive: true,
            },
         });
      }

      return rolePermissionExist;
   },
};

import prisma from "../common/prisma/init.prisma";

export const permissionService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      return `This action returns all permission`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} permission`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} permission`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} permission`;
   },

   groupByModule: async function (req) {
      const roleId = +req.params.id;
      const listPermission = await prisma.permissions.findMany({
         include: {
            RolePermission: {
               where: {
                  roleId: roleId,
                  isActive: true,
               }
            }
         }
      });
      const result = {};
      listPermission.forEach((item) => {
         if (Array.isArray(result[item.module])) {
            result[item.module].push(item);
         } else {
            result[item.module] = [];
            result[item.module].push(item);
         }
      });
      return result;
   },
};

const abc = {
   Article: [
      {
         id: 1,
         name: "READ ARTICLE",
         endpoint: "/article/",
         method: "GET",
         module: "Article",
         deletedBy: 0,
         isDeleted: false,
         deletedAt: null,
         createdAt: "2025-04-06T09:59:01.000Z",
         updatedAt: "2025-04-06T10:10:49.000Z",
      },
      {
         id: 2,
         name: "CREATE ARTICLE",
         endpoint: "/article/",
         method: "POST",
         module: "Article",
         deletedBy: 0,
         isDeleted: false,
         deletedAt: null,
         createdAt: "2025-04-12T09:42:36.000Z",
         updatedAt: "2025-04-12T09:42:36.000Z",
      },
   ],
   User: [
      {
         id: 5,
         name: "READ USER",
         endpoint: "/user/",
         method: "GET",
         module: "User",
         deletedBy: 0,
         isDeleted: false,
         deletedAt: null,
         createdAt: "2025-04-12T09:45:10.000Z",
         updatedAt: "2025-04-12T09:45:10.000Z",
      },
   ],
};

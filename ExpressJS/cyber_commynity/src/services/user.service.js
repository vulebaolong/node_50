import path from "path";
import prisma from "../common/prisma/init.prisma";
import fs from "fs";

export const userService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      let { page, pageSize, search } = req.query;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;
      search = search || ``;

      console.log({ page, pageSize });

      const skip = (page - 1) * pageSize;

      const where = { fullName: { contains: search } };
      const articles = await prisma.users.findMany({
         skip: skip,
         take: pageSize,
         orderBy: { createdAt: "desc" },
         where: where,
      });

      const totalItem = await prisma.users.count({
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
      return `This action returns a id: ${req.params.id} user`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} user`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} user`;
   },

   avatarLocal: async function (req) {
      console.log(req.file);
      const file = req.file;
      if (!file) {
         throw new Error("No file upload");
      }

      const user = req.user;
      const userId = Number(user.id);

      if (user?.avatar) {
         // nên dùng path để lấy ra đường dẫn chính xác trên mọi hệ điều hành (MacOS, linux, window)
         const oldFilePath = path.join("images", user.avatar);
         if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
         }
      }

      await prisma.users.update({
         where: { id: userId },
         data: { avatar: file.filename },
      });

      return {
         folder: "images/",
         filename: file.filename,
         imgUrl: `images/${file.filename}`,
      };
   },
};

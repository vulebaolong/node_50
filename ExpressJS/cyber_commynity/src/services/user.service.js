import path from "path";
import prisma from "../common/prisma/init.prisma";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

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
      console.log(`avatarLocal`, req.file);
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

   avatarCloud: async function (req) {
      console.log(`avatarCloud`, req.file);
      const file = req.file;
      if (!file) {
         throw new Error("No file upload");
      }

      const user = req.user;
      const userId = Number(user.id);

      cloudinary.config({
         cloud_name: "vulebaolong",
         api_key: "375481467533217",
         api_secret: "IdhzUoK7jRyQceWSIdUI2x86g24",
      });

      if (user?.avatar) {
         console.log(user.avatar);
         const oldFilePath = path.join("images", user.avatar);
         if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
         }
         await cloudinary.uploader.destroy(user.avatar);
      }

      const uploadResult = await new Promise((resolve) => {
         cloudinary.uploader
            .upload_stream({ folder: "images" }, (error, uploadResult) => {
               return resolve(uploadResult);
            })
            .end(file.buffer);
      });

      console.log({ uploadResult });

      await prisma.users.update({
         where: { id: userId },
         data: { avatar: uploadResult.public_id },
      });

      return {
         folder: uploadResult.folder,
         filename: file.filename,
         imgUrl: uploadResult.secure_url,
      };
   },
};

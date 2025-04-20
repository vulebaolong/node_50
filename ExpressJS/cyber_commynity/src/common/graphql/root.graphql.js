import { ACCESS_TOKEN_SECRET } from "../constant/app.constant";
import prisma from "../prisma/init.prisma";
import jwt from "jsonwebtoken";

const root = {
   hello() {
      return "Hello world!";
   },
   async getListArticle(payload, context) {
      console.log({ payload, context });
      let { page, pageSize, search } = payload;
      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;
      search = search || ``;

      console.log({ page, pageSize });

      const skip = (page - 1) * pageSize;

      const where = { content: { contains: search } };
      const articles = await prisma.articles.findMany({
         skip: skip,
         take: pageSize,
         orderBy: { createdAt: "desc" },
         where: where,
      });

      const totalItem = await prisma.articles.count({
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
   async createArticle(payload, context) {
      const { title, content, imageUrl } = payload;
      const { accessToken } = context;

      const { userId } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

      const newArticle = await prisma.articles.create({
         data: {
            title: title,
            content: content,
            imageUrl: imageUrl,
            userId: userId,
         },
      });
      
      return newArticle;
   },
};

export default root;

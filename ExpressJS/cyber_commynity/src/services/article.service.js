import prisma from "../common/prisma/init.prisma";

const articleService = {
   findAll: async (req) => {
      // console.log("dữ liệu ở service", req.user);
      let { page, pageSize, search } = req.query;
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
};

export default articleService;

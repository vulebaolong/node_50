import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
class ArticleService {
  constructor(private prismaService: PrismaService) {}

  async findAll(
    page: string | number,
    pageSize: string | number,
    search: string,
  ) {
    console.log({ page, pageSize });

    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 3;
    search = search || ``;

    console.log({ page, pageSize });

    const skip = (page - 1) * pageSize;

    const where = { content: { contains: search } };
    const articles = await this.prismaService.articles.findMany({
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      where: where,
    });

    const totalItem = await this.prismaService.articles.count({
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
  }

  async findOne(id: string) {
    const article = await this.prismaService.articles.findUnique({
      where: {
        id: +id,
      },
    });

    return article;
  }

  async update(id: string, body: UpdateArticleDto) {
    const articleUpdate = await this.prismaService.articles.update({
      where: { id: +id },
      data: body,
    });

    return articleUpdate;
  }
}

export default ArticleService;

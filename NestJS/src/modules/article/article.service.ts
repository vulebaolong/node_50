import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
class ArticleService {
  constructor(private prismaService: PrismaService) {}
  async findAll() {
    return await this.prismaService.articles.findMany();
  }
}

export default ArticleService;

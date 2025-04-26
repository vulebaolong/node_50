import { Controller, Get } from '@nestjs/common';
import ArticleService from './article.service';

@Controller('article')
class ArticleController {
  constructor(public articleService: ArticleService) {}

  @Get('/')
  async findAll() {
    return await this.articleService.findAll();
  }
}

export default ArticleController;

import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import ArticleService from './article.service';
import { Request } from 'express';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProtectGuard } from '../auth/protect/protect.guard';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';

@Controller('article')
@ApiTags('Article')
class ArticleController {
  constructor(public articleService: ArticleService) {}
  
  @SkipPermission()
  @Get('/')
  async findAll(
    @Req()
    req: Request,
    @Query()
    query: any,
    @Query('page')
    page: string,
    @Query('pageSize')
    pageSize: string,
    @Query('search')
    search: string,
  ) {
    // console.log({ user: req.user });
    return await this.articleService.findAll(page, pageSize, search);
  }

  @Get(`/:id`)
  async findOne(
    @Param()
    param: any,
    @Param('id')
    id: string,
  ) {
    // console.log({ param });
    return this.articleService.findOne(id);
  }

  @Patch(`/:id`)
  async update(
    @Param('id')
    id: string,
    @Body()
    body: UpdateArticleDto,
    @Headers()
    headers: any,
  ) {
    console.log({ headers });
    return this.articleService.update(id, body);
  }
}

export default ArticleController;

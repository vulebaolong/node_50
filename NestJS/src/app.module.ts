import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import ArticleModule from './modules/article/article.module';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';
import { PrismaService } from './modules/prisma/prisma.service';
import { PermissionStrategy } from './modules/auth/permission/permission.strategy';

@Module({
  imports: [ArticleModule, UserModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ProtectStrategy, PermissionStrategy],
})
export class AppModule {}

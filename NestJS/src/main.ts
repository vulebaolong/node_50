import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProtectGuard } from './modules/auth/protect/protect.guard';
import { PermissionGuard } from './modules/auth/permission/permission.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptor/response-success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // GLOBAL
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ những field không có trong dto
      forbidNonWhitelisted: true, // Nếu trong dto không khai báo thì sẽ bắn lỗi => throw error
    }),
  ); // bật validation global
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ProtectGuard(reflector));
  app.useGlobalGuards(new PermissionGuard(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new ResponseSuccessInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(PORT ?? 3000);
}
bootstrap();

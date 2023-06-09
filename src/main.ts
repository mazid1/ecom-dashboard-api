import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { type EnvironmentVariables } from './config/environment-variables';
import * as cookieParser from 'cookie-parser';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecom-Dashboard API')
    .setDescription('The Ecom-Dashboard API documentation')
    .setVersion('1.0')
    .addTag('products')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService<EnvironmentVariables>);

  const port = configService.get('PORT');

  await app.listen(port);

  Logger.log(`Server is running on http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

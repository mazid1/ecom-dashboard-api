import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type EnvironmentVariables } from './config/environment-variables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService<EnvironmentVariables>);

  const port = configService.get('PORT');

  await app.listen(port);

  Logger.log(`Server is running on http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

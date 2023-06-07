import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = 3000;

  await app.listen(port);

  Logger.log(`Server is running on http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

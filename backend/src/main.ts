import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  });

  setupSwagger(app);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  logger.log(`🚀 Server is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation available at: http://localhost:${port}/api/docs`,
  );

  const seedService = app.get(SeedService);
  await seedService.seedDatabase();
}
bootstrap();

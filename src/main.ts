import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { setupSwagger } from '@config/swagger';
import Sentry from '@config/Sentry';
import config from '@config/index';
import logger from '@config/logger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Cấu hình CORS
    app.enableCors({
      origin: ['http://localhost:3000', 'http://subdomain.example.com'],
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true,
    });
    app.use(
      Sentry.Handlers.requestHandler({
        serverName: true,
        transaction: 'methodPath',
      }),
    );
    // Sử dụng Morgan middleware với định dạng combined
    app.use(morgan('combined'));
    app.setGlobalPrefix('api');
    // Cài đặt Swagger
    setupSwagger(app);
    logger.info('SIGTERM received');
    await app.listen(config.port || 5000);
  } catch (err) {
    console.error('Error during application startup:', err);
  }
}
bootstrap();

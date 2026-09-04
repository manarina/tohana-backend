import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';



async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS
  const corsOrigin = configService.get('cors.origin', ['*']);
  app.enableCors({
    origin: corsOrigin,
    methods: configService.get('cors.methods', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
    credentials: configService.get('cors.credentials', true),
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  const port = configService.get('port', 3000);
  await app.listen(port);

  logger.log(`🚀 Application running on: http://localhost:${port}/graphql`);
  logger.log(`📊 Database: ${configService.get('database.database')}`);
  logger.log(`🌍 Environment: ${configService.get('nodeEnv', 'development')}`);
}
bootstrap();
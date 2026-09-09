import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';



async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ============================================================
  // VALIDATION GLOBALE
  // ============================================================
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

  // ============================================================
  // CORS
  // ============================================================
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://tohana-frontend.vercel.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans Origin
      // (ex: certains outils backend, Postman, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      logger.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    },

    credentials: true,

    methods: [
      'GET',
      'HEAD',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Apollo-Require-Preflight',
    ],

    exposedHeaders: [
      'Authorization',
    ],
  });

  // ============================================================
  // PORT
  // ============================================================
  const port = configService.get<number>('port', 3000);

  await app.listen(port, '0.0.0.0');

  // ============================================================
  // LOGS
  // ============================================================
  logger.log(
    `🚀 Application running on: http://localhost:${port}/graphql`,
  );

  logger.log(
    `🌍 Environment: ${configService.get<string>(
      'nodeEnv',
      'development',
    )}`,
  );

  logger.log(
    `📊 Database: ${configService.get<string>(
      'database.database',
      'unknown',
    )}`,
  );

  logger.log(
    `🔐 CORS allowed origins: ${allowedOrigins.join(', ')}`,
  );
}

bootstrap();


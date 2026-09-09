
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseUrl = configService.get<string>('database.url');

  const isProduction =
    configService.get<string>('nodeEnv') === 'production';

  // ============================================================
  // PRODUCTION : Neon PostgreSQL
  // ============================================================

  if (isProduction && databaseUrl) {
    return {
      type: 'postgres',

      url: databaseUrl,

      entities: [__dirname + '/../**/*.entity{.ts,.js}'],

      synchronize: false,

      logging: false,

      ssl: {
        rejectUnauthorized: false,
      },

      extra: {
        max: 10,
        connectionTimeoutMillis: 30000,
      },
    };
  }

  // ============================================================
  // DEVELOPMENT : PostgreSQL local
  // ============================================================

  return {
    type: 'postgres',

    host: configService.get<string>('database.host'),

    port: configService.get<number>('database.port'),

    username: configService.get<string>('database.username'),

    password: configService.get<string>('database.password'),

    database: configService.get<string>('database.database'),

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],

    synchronize: configService.get<boolean>('database.synchronize'),

    logging: configService.get<boolean>('database.logging'),

    extra: {
      max: configService.get<number>('database.maxConnections'),

      connectionTimeoutMillis:
        configService.get<number>('database.connectionTimeout'),
    },
  };
};


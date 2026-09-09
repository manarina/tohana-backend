import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: process.env.DOTENV_CONFIG_PATH || '.env',
});

const databaseUrl = process.env.DATABASE_URL;

const isProduction =
  process.env.NODE_ENV === 'production' || !!databaseUrl;

export default new DataSource({
  type: 'postgres',

  ...(isProduction && databaseUrl
    ? {
        url: databaseUrl,

        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_DATABASE || 'tohana_db',
      }),

  entities: [
    'src/modules/**/*.entity.ts',
  ],

  migrations: [
    'src/migrations/*.ts',
  ],

  synchronize: false,

  logging: process.env.DB_LOGGING === 'true',

  extra: {
    max: parseInt(
      process.env.DB_MAX_CONNECTIONS || '10',
      10,
    ),

    connectionTimeoutMillis: parseInt(
      process.env.DB_CONNECTION_TIMEOUT || '30000',
      10,
    ),
  },
});
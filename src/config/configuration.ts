
export default () => ({
  port: parseInt(process.env.PORT ?? '', 10) || 3000,

  apiPrefix: process.env.API_PREFIX || '/api/v1',

  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    // Production : Neon via DATABASE_URL
    url: process.env.DATABASE_URL || '',

    // Développement local : PostgreSQL classique
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'tohana_db',

    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',

    maxConnections:
      parseInt(process.env.DB_MAX_CONNECTIONS ?? '', 10) || 20,

    connectionTimeout:
      parseInt(process.env.DB_CONNECTION_TIMEOUT ?? '', 10) || 5000,
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: process.env.JWT_EXPIRATION || '365d',

    refreshSecret:
      process.env.JWT_REFRESH_SECRET || 'refreshSecretKey',

    refreshExpiresIn:
      process.env.JWT_REFRESH_EXPIRATION || '30d',
  },

  cors: {
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : ['*'],

    methods: process.env.CORS_METHODS
      ? process.env.CORS_METHODS.split(',')
      : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],

    credentials: process.env.CORS_CREDENTIALS === 'true',
  },

  graphql: {
    playground: process.env.GRAPHQL_PLAYGROUND !== 'false',
    introspection: process.env.GRAPHQL_INTROSPECTION !== 'false',
    sortSchema: process.env.GRAPHQL_SORT_SCHEMA !== 'false',
  },

  security: {
    bcryptRounds:
      parseInt(process.env.BCRYPT_ROUNDS ?? '', 10) || 10,

    passwordMinLength:
      parseInt(process.env.PASSWORD_MIN_LENGTH ?? '', 10) || 8,

    maxLoginAttempts:
      parseInt(process.env.MAX_LOGIN_ATTEMPTS ?? '', 10) || 5,

    blockTimeMinutes:
      parseInt(process.env.BLOCK_TIME_MINUTES ?? '', 10) || 15,
  },

  rateLimit: {
    ttl:
      parseInt(process.env.RATE_LIMIT_TTL ?? '', 10) || 60,

    maxRequests:
      parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? '', 10) || 100,
  },

  seed: {
    enabled: process.env.SEED_ENABLED === 'true',

    usersCount:
      parseInt(process.env.SEED_USERS_COUNT ?? '', 10) || 10,

    farmsCount:
      parseInt(process.env.SEED_FARMS_COUNT ?? '', 10) || 50,
  },
});


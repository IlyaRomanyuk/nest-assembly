import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({
  path: '.env',
});

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 9000,
  baseUrl: process.env.BASE_URL,
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isStage: process.env.NODE_ENV === 'staging',
  db: {
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  },
  keys: {
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtAccessTokenExpirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    jwtRefreshTokenExpirationTime:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  },
};

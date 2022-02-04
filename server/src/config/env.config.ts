require('dotenv').config();

export const envConfig = {
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'mykickasssecret',
  environment: process.env.NODE_ENVIRONMENT || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    url: process.env.DATABASE_URL,
  },
  google: {
    cliendId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
};

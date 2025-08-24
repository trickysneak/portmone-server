import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/moneybot',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

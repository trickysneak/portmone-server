import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  await mongoose.connect(env.MONGO_URI);
  console.log('[DB] connected:', env.MONGO_URI);
}

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';

export async function mockAuth(req: Request, _res: Response, next: NextFunction) {
  let user = await User.findOne();
  if (!user) user = await User.create({ fullName: 'Test User', balance: 0 });
  (req as any).user = user;
  next();
}

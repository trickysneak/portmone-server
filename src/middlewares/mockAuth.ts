import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export function mockAuth(_req: Request, _res: Response, next: NextFunction) {
  // фиктивный пользователь
  (_req as any).user = { _id: new Types.ObjectId() };
  next();
}

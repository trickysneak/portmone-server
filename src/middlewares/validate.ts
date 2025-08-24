import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export const validateBody = (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return next(ApiError.badRequest(parsed.error.flatten()));
    }
    (req as any).body = parsed.data;
    next();
  };

export const validateQuery = (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      return next(ApiError.badRequest(parsed.error.flatten()));
    }
    (req as any).query = parsed.data as any;
    next();
  };

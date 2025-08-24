import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { SeedService } from '../services/seed.service.js';

export const DebugController = {
  health: asyncHandler(async (_req: Request, res: Response) => {
    res.json({ ok: true });
  }),
  reset: asyncHandler(async (_req: Request, res: Response) => {
    await SeedService.reset();
    res.json({ ok: true });
  }),
  seed: asyncHandler(async (req: Request, res: Response) => {
    const n = Number((req.body && (req.body as any).txCount) ?? 30);
    const out = await SeedService.seed(isNaN(n) ? 30 : n);
    res.json(out);
  }),
};

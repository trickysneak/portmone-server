import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { CategoriesService } from "../services/categories.service.js";

export const CategoriesController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const rawType = (req.query.type as string | undefined)
      ?.toLowerCase()
      .trim();
    const type =
      rawType === "debit" || rawType === "credit" ? rawType : undefined;

    const items = await CategoriesService.list(user._id, { type });
    res.json(items);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    // нормализуем тип на входе
    if (req.body?.type) {
      const t = String(req.body.type).toLowerCase();
      req.body.type = t === "credit" ? "credit" : "debit";
    }
    const item = await CategoriesService.create(user._id, req.body);
    res.status(201).json(item);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    if (req.body?.type) {
      const t = String(req.body.type).toLowerCase();
      req.body.type = t === "credit" ? "credit" : "debit";
    }
    const item = await CategoriesService.update(
      user._id,
      req.params.id,
      req.body
    );
    res.json(item);
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    await CategoriesService.remove(user._id, req.params.id);
    res.status(204).end();
  }),

  addQuick: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const item = await CategoriesService.addQuick(
      user._id,
      req.params.id,
      req.body
    );
    res.json(item);
  }),
};

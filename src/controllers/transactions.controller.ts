// src/controllers/transactions.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { TransactionsService } from "../services/transactions.service.js";

export const TransactionsController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const data = await TransactionsService.list(user._id, req.query as any);
    res.json(data);
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const tx = await TransactionsService.create(user._id, req.body);
    res.status(201).json(tx);
  }),
};

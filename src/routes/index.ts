// src/routes/index.ts
import { Router } from "express";
import { env } from "../config/env.js";

// публичные
import debug from "./debug.routes.js";
import authRoutes from "./auth.routes.js"; // см. файл ниже

// приватные
import categories from "./categories.routes.js";
import transactions from "./transactions.routes.js";
import stats from "./stats.routes.js";
import users from "./users.routes.js";

// Экспортируем ДВА роутера
export const publicRouter = Router();
publicRouter.use("/health", debug); // GET /api/health
publicRouter.use("/debug", debug); // /api/debug/*
publicRouter.use("/auth", authRoutes); // POST /api/auth/telegram

export const privateRouter = Router();
privateRouter.use("/categories", categories);
privateRouter.use("/transactions", transactions);
privateRouter.use("/stats", stats);
privateRouter.use("/users", users);

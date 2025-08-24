import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { env } from "./config/env.js";
import { publicRouter, privateRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authJwt } from "./middlewares/authJwt.js";
import { mockAuth } from "./middlewares/mockAuth.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: true, // лучше указать домен фронта
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

// Публичные роуты (без авторизации)
app.use("/api", publicRouter);

// Приватные роуты — защитим в зависимости от режима
if (process.env.AUTH_MODE === "telegram") {
  app.use("/api", authJwt, privateRouter);
} else {
  app.use("/api", mockAuth, privateRouter); // дев-режим без телеги
}

// errors
app.use(errorHandler);

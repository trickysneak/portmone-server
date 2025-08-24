import { Router } from "express";
import { StatsController } from "../controllers/stats.controller.js";

const r = Router();
r.get("/by-category", StatsController.byCategory);
export default r;

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
const r = Router();
r.post("/telegram", AuthController.telegramLogin);
export default r;

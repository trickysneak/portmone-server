import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
const r = Router();
r.get("/me", UsersController.me);
export default r;

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authJwt(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer "))
    return res.status(401).json({ message: "No token" });
  try {
    const token = h.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).user = { _id: payload.uid, tgId: payload.tgId };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

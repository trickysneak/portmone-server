import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  verifyInitData,
  parseUserFromInitData,
} from "../utils/telegramWebApp.js";
import { User } from "../models/User.js";

export const AuthController = {
  telegramLogin: async (req: Request, res: Response) => {
    const { initData } = req.body as { initData?: string };
    if (!initData)
      return res.status(400).json({ message: "initData required" });

    const ok = verifyInitData(initData, process.env.TELEGRAM_BOT_TOKEN!);
    if (!ok) return res.status(401).json({ message: "Invalid initData" });

    const tg = parseUserFromInitData(initData);
    if (!tg?.id)
      return res.status(400).json({ message: "No user in initData" });

    const fullName = [tg.first_name, tg.last_name].filter(Boolean).join(" ");
    const patch = {
      tgId: String(tg.id),
      fullName,
      avatar: tg.photo_url,
    };

    const user = await User.findOneAndUpdate(
      { tgId: String(tg.id) },
      { $set: patch, $setOnInsert: { balance: 0 } }, // balance по умолчанию при первом логине
      { upsert: true, new: true }
    );

    const token = jwt.sign(
      { uid: user._id, tgId: user.tgId },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        tgId: user.tgId,
        fullName: user.fullName,
        avatar: user.avatar,
        balance: user.balance,
      },
    });
  },
};

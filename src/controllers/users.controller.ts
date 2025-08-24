import { Request, Response } from "express";
import { User } from "../models/User.js";

export const UsersController = {
  me: async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      _id: user._id,
      tgId: user.tgId,
      fullName: user.fullName,
      avatar: user.avatar,
      balance: user.balance,
      createdAt: user.createdAt,
    });
  },
};

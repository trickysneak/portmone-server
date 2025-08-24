// src/services/transactions.service.ts
import { Transaction } from "../models/Transaction.js";
import { User } from "../models/User.js";

export const TransactionsService = {
  async create(
    userId: string,
    data: {
      title: string;
      amount: number;
      direction: "debit" | "credit";
      categoryId?: string;
      emoji?: string;
    }
  ) {
    const tx = await Transaction.create({ userId, ...data });
    const delta = data.direction === "debit" ? -data.amount : data.amount;
    await User.updateOne({ _id: userId }, { $inc: { balance: delta } });

    // 👇 вернём с популяцией категории
    const populated = await tx.populate({
      path: "categoryId",
      select: "name icon type",
    });
    return populated;
  },

  // добавим флаг populate (по умолчанию true)
  async list(
    userId: string,
    q: { from?: string; to?: string; populate?: string | boolean }
  ) {
    const filter: any = { userId };
    if (q.from || q.to) {
      filter.createdAt = {};
      if (q.from) filter.createdAt.$gte = new Date(q.from);
      if (q.to) filter.createdAt.$lte = new Date(q.to);
    }

    const populate = (q.populate ?? "1") !== "0" && q.populate !== false;

    let query = Transaction.find(filter).sort({ createdAt: -1 });
    if (populate) {
      query = query.populate({ path: "categoryId", select: "name icon type" });
    }
    return query.lean();
  },
};

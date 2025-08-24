import { Transaction } from "../models/Transaction.js";
import { Types } from "mongoose";
import { PipelineStage } from "mongoose";

type StatsArgs = {
  userId: string;
  from?: string;
  to?: string;
  direction?: "debit" | "credit";
};

export async function statsByCategory({
  userId,
  from,
  to,
  direction = "debit",
}: StatsArgs) {
  const match: any = { userId: new Types.ObjectId(userId), direction };
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = new Date(from);
    if (to) match.createdAt.$lte = new Date(to);
  } else {
    // дефолт: сегодня
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const start = d;
    const end = new Date(d);
    end.setHours(23, 59, 59, 999);
    match.createdAt = { $gte: start, $lte: end };
  }

  const pipeline: PipelineStage[] = [
    { $match: match },
    {
      $group: {
        _id: "$categoryId", // может быть null
        amount: { $sum: "$amount" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "cat",
      },
    },
    { $unwind: { path: "$cat", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        categoryId: "$_id",
        amount: 1,
        categoryName: { $ifNull: ["$cat.name", "Без категории"] },
        color: { $ifNull: ["$cat.color", "#6b7280"] },
        _id: 0,
      },
    },
    { $sort: { amount: -1 } },
  ];

  const rows = await Transaction.aggregate(pipeline);

  const total = rows.reduce((s: number, r: any) => s + (r.amount || 0), 0);
  const items = rows.map((r: any) => ({
    ...r,
    percent: total ? Math.round((r.amount / total) * 100) : 0,
  }));

  return { total, items };
}

// src/services/categories.service.ts
import { Category } from "../models/Category.js";

type CatType = "debit" | "credit";
type CreateDTO = { name: string; color?: string; type?: CatType | "both" };
type UpdateDTO = Partial<{
  name: string;
  color: string;
  type: CatType | "both";
}>;
type ListQuery = { type?: CatType };

function normalizeType(t?: string): CatType | undefined {
  if (!t) return undefined;
  const low = String(t).toLowerCase();
  return low === "credit" ? "credit" : low === "debit" ? "debit" : undefined;
}

export const CategoriesService = {
  // добавили второй аргумент с фильтром
  async list(userId: string, q: ListQuery = {}) {
    const filter: any = { userId };
    const t = normalizeType(q.type);
    if (t) filter.type = t;
    return Category.find(filter).sort({ createdAt: -1 }).lean();
  },

  async create(userId: string, data: CreateDTO) {
    const type = normalizeType(data.type) ?? "debit"; // дефолт — расход
    return Category.create({
      userId,
      name: data.name,
      color: data.color,
      type,
    });
  },

  async update(userId: string, id: string, data: UpdateDTO) {
    const patch: any = { ...data };
    if (data.type !== undefined) {
      const t = normalizeType(data.type);
      if (t) patch.type = t;
      else delete patch.type; // игнорим невалидные значения
    }
    return Category.findOneAndUpdate({ _id: id, userId }, patch, {
      new: true,
    }).lean();
  },

  async remove(userId: string, id: string) {
    return Category.deleteOne({ _id: id, userId });
  },

  async addQuick(
    userId: string,
    id: string,
    quick: { label: string; amount: number; direction: "debit" | "credit" }
  ) {
    return Category.findOneAndUpdate(
      { _id: id, userId },
      { $push: { quickActions: quick } },
      { new: true }
    ).lean();
  },
};

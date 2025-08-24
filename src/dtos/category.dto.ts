import { z } from "zod";

export const createCategoryDto = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  color: z
    .string()
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
    .optional(),
  type: z.enum(["debit", "credit", "both"]).optional(),
});

export const updateCategoryDto = createCategoryDto.partial();

export const createQuickActionDto = z.object({
  label: z.string().min(1),
  amount: z.number().positive(),
  direction: z.enum(["debit", "credit"]),
});

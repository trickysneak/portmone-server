import { z } from 'zod';

export const createTransactionDto = z.object({
  title: z.string().min(1),
  amount: z.number().positive(),
  direction: z.enum(['debit', 'credit']),
  categoryId: z.string().optional(),
  emoji: z.string().optional(),
});

export const listQueryDto = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  title: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  direction: { type: String, enum: ['debit', 'credit'], required: true },
  emoji: String
}, { timestamps: true });

export type TransactionDoc = mongoose.InferSchemaType<typeof TransactionSchema> & { _id: mongoose.Types.ObjectId };
export const Transaction = mongoose.model('Transaction', TransactionSchema);

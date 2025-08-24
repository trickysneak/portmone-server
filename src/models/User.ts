import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  tgId: { type: String, index: true },
  fullName: String,
  avatar: String,
  balance: { type: Number, default: 0 },
}, { timestamps: true });

export type UserDoc = mongoose.InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };
export const User = mongoose.model('User', UserSchema);

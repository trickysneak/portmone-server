import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    name: { type: String, required: true },
    icon: { type: String },
    color: { type: String },
    type: { type: String, enum: ["debit", "credit", "both"], default: "both" },
  },
  { timestamps: true }
);

export type CategoryDoc = mongoose.InferSchemaType<typeof CategorySchema> & {
  _id: mongoose.Types.ObjectId;
};
export const Category = mongoose.model("Category", CategorySchema);

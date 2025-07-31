import mongoose, { Schema } from "mongoose";

const sizeSchema = new Schema(
  { name: { type: String, required: true } },
  { timestamps: true, versionKey: false }
);
const Size = mongoose.model("Size", sizeSchema)

export default Size;
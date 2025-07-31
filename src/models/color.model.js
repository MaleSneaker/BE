import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Color = mongoose.model("Color", colorSchema)

export default Color;
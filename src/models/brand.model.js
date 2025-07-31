import { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
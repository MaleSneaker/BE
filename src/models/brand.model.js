import mongoose, { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const brandSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
brandSchema.plugin(paginate);
const Brand = model("Brand", brandSchema);

export default Brand;

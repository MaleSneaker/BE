import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const sizeSchema = new Schema(
  { name: { type: String, required: true } },
  { timestamps: true, versionKey: false }
);
sizeSchema.plugin(paginate);
const Size = mongoose.model("Size", sizeSchema);

export default Size;

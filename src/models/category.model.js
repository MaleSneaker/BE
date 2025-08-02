import { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
categorySchema.plugin(paginate);
const Category = model("Category", categorySchema);

export default Category;

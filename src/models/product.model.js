import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    thumbnall: { type: String, required: true },
    images: {
      type: [String],
      required: true,
      max: 5,
    },
    price: {
      type: Number,
      min: 1000,
      required: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
    sold: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: [String],
      enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(paginate);
const Product = mongoose.model("Product", productSchema);

export default Product;

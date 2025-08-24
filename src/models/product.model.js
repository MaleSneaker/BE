import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
const sizeSchema = new Schema(
  {
    value: {
      type: String,
      enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
      required: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: false,
    timestamps: false,
    versionKey: false,
  }
);
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String, required: true },
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
    sold: {
      type: Number,
      default: 0,
    },
    sizes: [sizeSchema],
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

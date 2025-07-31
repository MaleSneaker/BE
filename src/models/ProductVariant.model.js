import mongoose, { Schema } from "mongoose";

const productvariantSchema = new Schema(
  {
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

const ProductVariant = mongoose.model("ProductVariant", productvariantSchema);

export default ProductVariant;

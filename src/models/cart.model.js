import mongoose, { mongo, Schema } from "mongoose";

const cartItems = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    size: {
      isAvailable: {
        type: Boolean,
        default: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
  }
);

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    items: {
      type: [cartItems],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// Đánh index để query database nhanh hơn
cartSchema.index({ userId: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

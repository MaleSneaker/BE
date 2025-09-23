import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },

  { versionKey: false, timestamps: false, _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    customerInfo: userSchema,
    receiverInfo: userSchema,
    address: {
      province: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      detail: {
        type: String,
        required: true,
      },
    },
    items: [orderItemSchema],
    note: String,
    canceled: {
      by: String,
      description: String,
    },
    feeShipping: {
      type: Number,
      default: 30000,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipping",
        "delivered",
        "done",
        "cancelled",
      ],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.plugin(paginate);
const Order = mongoose.model("Order", orderSchema);

export default Order;

import mongoose from "mongoose";
import createError from "../utils/errorHandle.js";
import Cart from "./cart.model.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://hoseiki.vn/wp-content/uploads/2025/03/avatar-fb-3.jpg",
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "admin"],
      default: "User",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activeToken: {
      type: String,
      default: "",
    },
    blocked: {
      isBlocked: {
        type: Boolean,
        default: false,
      },
      by: {
        type: String,
        default: "admin",
      },
      description: {
        type: String,
        required: function () {
          return this.blocked.isBlocked;
        },
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) return next();
    await Cart.create({ userId: this._id, items: [] });
    next();
  } catch (error) {
    next(createError(500, error.toString()));
  }
});

const User = mongoose.model("User", userSchema);
export default User;

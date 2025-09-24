import PayOS from "@payos/node";
import Order from "../models/order.model.js";
import createError from "../utils/errorHandle.js";
import createResponse from "../utils/response.js";
import User from "../models/user.model.js";
import { updateInventoryStockCreateOrder } from "./inventory.services.js";
import Cart from "../models/cart.model.js";

const payOS = new PayOS(
  "c2c838d3-95f3-4aba-9d17-e50f1f9c2b39",
  "3a0e49ae-c498-4d1e-b1dc-387294c3be25",
  "44b9a1ee41790bff3df79e88972dfedc9505600759452021d67906d5f7fadfcf"
);

export const createPaymentLinkService = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(req.user._id);
  if (!user || user.blocked.isBlocked) {
    return next(
      createError(400, "Tài khoản của bạn không hợp lệ hoặc đã bị khóa!")
    );
  }
  const customerInfo = {
    name: user.userName,
    email: user.email,
    phone: user.phone,
  };
  const orderCode = Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);
  const body = {
    orderCode: orderCode,
    amount: req.body.totalPrice,
    description: req.body.note || "Không có ghi chú",
    items: req.body.items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    cancelUrl: "http://localhost:5173/error",
    returnUrl: "http://localhost:3000/api/order/return",
  };
  const paymentLinkRes = await payOS.createPaymentLink(body);
  await Order.create({
    ...req.body,
    userId,
    orderCode,
    paymentMethod: "online",
    customerInfo,
  });
  if (!paymentLinkRes.checkoutUrl) {
    throw createError(500, "Có lỗi vui lòng thử lại sau");
  }
  return res
    .status(200)
    .json(
      createResponse(
        true,
        200,
        "Đặt hàng thành công",
        paymentLinkRes.checkoutUrl
      )
    );
};

export const returnPaymentLinkService = async (req, res, next) => {
  const { status, orderCode } = req.query;
  if (status !== "PAID") {
    res.redirect("http://localhost:5173/error");
  }
  const foundOrder = await Order.findOne({ orderCode });
  if (!foundOrder) {
    res.redirect("http://localhost:5173/error");
  }
  await updateInventoryStockCreateOrder(foundOrder.items);
  await Cart.findOneAndUpdate(
    { userId: foundOrder.userId },
    { $set: { items: [] } },
    { new: true }
  );
  foundOrder.isPaid = true;
  await foundOrder.save();
  return res.redirect("http://localhost:5173/success");
};

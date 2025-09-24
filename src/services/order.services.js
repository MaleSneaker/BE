import buildQuery from "../helpers/buildQuery.js";
import Order from "../models/order.model.js";
import createResponse from "../utils/response.js";
import User from "../models/user.model.js";
import createError from "../utils/errorHandle.js";
import { updateInventoryStockCreateOrder } from "./inventory.services.js";
import Cart from "../models/cart.model.js";

export const createOrderService = async (req, res, next) => {
  const { items } = req.body;
  const userId = req.user._id;
  if (!Array.isArray(items) || items.length === 0) {
    return next(createError(400, "Chưa có sản phẩm để đặt hàng"));
  }
  const user = await User.findById(userId);
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
  await updateInventoryStockCreateOrder(items);
  await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );
  const order = await Order.create({
    ...req.body,
    userId,
    items,
    customerInfo,
  });
  return res
    .status(201)
    .json(createResponse(true, 201, "Đặt hàng thành công", order));
};

export const getAllOrderService = async (req, res, next) => {
  const { filter, options } = buildQuery(req.query);
  options.populate = {
    path: "items.productId",
  };
  const orders = await Order.paginate(filter, options);
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy danh sách thành công", orders));
};

export const getDetailOrderService = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate({
    path: "items.productId",
  });
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy chi tiết đơn hàng thành công", order));
};

export const getMyOrderService = async (req, res, next) => {
  const { filter, options } = buildQuery(req.query);
  const userId = req.user._id;
  options.populate = {
    path: "items.productId",
    select: "thumbnail",
  };
  const orders = await Order.paginate({ userId, ...filter }, options);
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy danh sách thành công", orders));
};

export const getDetailMyOrderService = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const order = await Order.findOne({ _id: id, userId }).populate({
    path: "items.productId",
  });
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy chi tiết đơn hàng thành công", order));
};

export const updateStatusOrderService = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findOne({
    _id: id,
    status: { $ne: status },
  });
  if (!order) {
    throw createError(400, "Đơn hàng không tồn tại!");
  }
  if (status === "done") {
    order.isPaid = true;
  }
  order.status = status;
  await order.save();
  return res
    .status(200)
    .json(createResponse(true, 200, "Cập nhật trạng thái thành công", order));
};

export const cancelOrderService = async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    _id: id,
    status: { $nin: ["done", "cancelled"] },
  });
  if (!order) {
    throw createError(400, "Đơn hàng không tồn tại!");
  }
  order.canceled.by = req.body.by;
  order.canceled.description = req.body.description;
  await order.save();
  return res
    .status(200)
    .json(createResponse(true, 200, "Hủy đơn hàng thành công", order));
};

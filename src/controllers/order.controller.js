import {
  createPaymentLinkService,
  returnPaymentLinkService,
} from "../services/checkout.services.js";
import {
  cancelOrderService,
  createOrderService,
  getAllOrderService,
  getDetailMyOrderService,
  getDetailOrderService,
  getMyOrderService,
  updateStatusOrderService,
} from "../services/order.services.js";
import handleASync from "../utils/handleAsync.js";

export const getAllOrder = handleASync(async (req, res, next) => {
  return await getAllOrderService(req, res, next);
});

export const getDetailOrder = handleASync(async (req, res, next) => {
  return await getDetailOrderService(req, res, next);
});

export const getMyOrder = handleASync(async (req, res, next) => {
  return await getMyOrderService(req, res, next);
});

export const getDetailMyOrder = handleASync(async (req, res, next) => {
  return await getDetailMyOrderService(req, res, next);
});

export const createOrder = handleASync(async (req, res, next) => {
  return await createOrderService(req, res, next);
});

export const updateStatusOrder = handleASync(async (req, res, next) => {
  return await updateStatusOrderService(req, res, next);
});

export const cancelOrder = handleASync(async (req, res, next) => {
  return await cancelOrderService(req, res, next);
});

export const createPaymentLink = handleASync(async (req, res, next) => {
  return await createPaymentLinkService(req, res, next);
});

export const returnPaymentLink = handleASync(async (req, res, next) => {
  return await returnPaymentLinkService(req, res, next);
});

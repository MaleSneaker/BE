import {
  createOrderService,
  getDetailMyOrderService,
  getMyOrderService,
} from "../services/order.services.js";
import handleASync from "../utils/handleAsync.js";

export const getMyOrder = handleASync(async (req, res, next) => {
  return await getMyOrderService(req, res, next);
});

export const getDetailMyOrder = handleASync(async (req, res, next) => {
  return await getDetailMyOrderService(req, res, next);
});

export const createOrder = handleASync(async (req, res, next) => {
  return await createOrderService(req, res, next);
});

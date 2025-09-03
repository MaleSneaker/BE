import {
  addToCartServices,
  getAllCartServices,
} from "../services/cart.services.js";
import handleASync from "../utils/handleAsync.js";

export const getAllCart = handleASync(async (req, res, next) => {
  return await getAllCartServices(req, res, next);
});

export const addToCart = handleASync(async (req, res, next) => {
  return await addToCartServices(req, res, next);
});
import {
  createProductService,
  getAllProductsService,
  getDetailProductService,
  updateProductService,
  updateStatusProductService
} from "../services/product.services.js";
import handleASync from "../utils/handleAsync.js";

export const getAllProducts = handleASync(async (req, res, next) => {
  return await getAllProductsService(req, res, next);
});

export const getRelatedProduct = handleASync(async (req, res, next) => {
  return await getRelatedProductService(req, res, next);
});

export const getDetailProduct = handleASync(async (req, res, next) => {
  return await getDetailProductService(req, res, next);
});

export const createProduct = handleASync(async (req, res, next) => {
  return await createProductService(req, res, next);
});

export const updatedProduct = handleASync(async (req, res, next) => {
  return await updateProductService(req, res, next);
});

export const updateStatusProduct = handleASync(async (req, res, next) => {
  return await updateStatusProductService(req, res, next);
});

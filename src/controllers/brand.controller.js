import {
  createBrandService,
  getAllBrandService,
  getDetailBrandService,
  updateBrandService,
} from "../services/brand.services.js";
import handleASync from "../utils/handleAsync.js";

export const createBrand = handleASync(async (req, res, next) => {
  return await createBrandService(req, res, next);
});

export const getAllBrand = handleASync(async (req, res, next) => {
  return await getAllBrandService(req, res, next);
});

export const getDetailBrand = handleASync(async (req, res, next) => {
  return await getDetailBrandService(req, res, next);
});

export const updateBrand = handleASync(async (req, res, next) => {
  return await updateBrandService(req, res, next);
});

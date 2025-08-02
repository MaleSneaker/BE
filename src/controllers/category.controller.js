import {
  createCategoryService,
  getAllCategoryService,
  getDetailedCategoryService,
  updateCategoryService,
} from "../services/category.services.js";
import handleASync from "../utils/handleAsync.js";

export const createCategory = handleASync(async (req, res, next) => {
  return await createCategoryService(req, res, next);
});

export const getALlCategory = handleASync(async (req, res, next) => {
  return await getAllCategoryService(req, res, next);
});

export const getDetailed = handleASync(async (req, res, next) => {
  return await getDetailedCategoryService(req, res, next);
});

export const updateCategory = handleASync(async (req, res, next) => {
  return await updateCategoryService(req, res, next);
});

import {
  createColorService,
  getAllColorService,
  getDetailColorService,
  updatedColorService,
} from "../services/color.services.js";
import handleASync from "../utils/handleAsync.js";

export const createColor = handleASync(async (req, res, next) => {
  return await createColorService(req, res, next);
});

export const getAllColor = handleASync(async (req, res, next) => {
  return await getAllColorService(req, res, next);
});

export const getDetailedColor = handleASync(async (req, res, next) => {
  return await getDetailColorService(req, res, next);
});

export const updateColor = handleASync(async (req, res, next) => {
  return await updatedColorService(req, res, next);
});
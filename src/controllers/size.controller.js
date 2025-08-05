import {
  createSizeService,
  getAllSizeService,
  getDetailSizeService,
  updateSizeService,
} from "../services/size.services.js";
import handleASync from "../utils/handleAsync.js";

export const createSize = handleASync(async (req, res, next) => {
  return await createSizeService(req, res, next);
});

export const getAllSize = handleASync(async (req, res, next) => {
  return await getAllSizeService(req, res, next);
});

export const getDetailedSize = handleASync(async (req, res, next) => {
  return await getDetailSizeService(req, res, next);
});

export const updateSize = handleASync(async (req, res, next) => {
  return await updateSizeService(req, res, next);
});

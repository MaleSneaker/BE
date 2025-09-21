import axios from "axios";
import handleASync from "../utils/handleAsync.js";
import createResponse from "../utils/response.js";
import createError from "../utils/errorHandle.js";

export const getProvince = handleASync(async (req, res, next) => {
  const { data } = await axios.get(
    `https://production.cas.so/address-kit/2025-07-01/provinces`
  );
  const response = data?.provinces?.map((item) => {
    return {
      name: item.name,
      _id: item.code,
    };
  });
  return res.status(200).json(createResponse(true, 200, "OK", response));
});

export const getWard = handleASync(async (req, res, next) => {
  const { provinceId } = req.params;
  if (!provinceId) {
    throw createError(400, "Chưa có id của tỉnh thành");
  }
  const { data } = await axios.get(
    `https://production.cas.so/address-kit/2025-07-01/provinces/${provinceId}/communes`
  );
  const response = data?.communes?.map((item) => {
    return {
      _id: item.code,
      provinceId: item.provinceCode,
      name: item.name,
    };
  });
  return res.status(200).json(createResponse(true, 200, "OK", response));
});

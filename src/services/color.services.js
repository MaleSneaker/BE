import buildQuery from "../helpers/buildQuery.js";
import Color from "../models/color.model.js";
import createError from "../utils/errorHandle.js";
import createResponse from "../utils/response.js";

export const createColorService = async (req, res, next) => {
  const existingColor = await Color.findOne({
    $or: [{ name: req.body.name }, { hex: req.body.name }],
  });
  if (existingColor) {
    return next(createError(400, "Màu này đã tồn tại"));
  }
  const newColor = await Color.create({ ...req.body });
  return res
    .status(200)
    .json(createResponse(true, 201, "Tạo màu sắc thành công", newColor));
};

export const getAllColorService = async (req, res, next) => {
  const { filter, options } = buildQuery(req.query);
  const colors = await Color.paginate(filter, options);
  return res
    .status(200)
    .json(
      createResponse(true, 200, "Lấy danh sách màu sắc thành công", colors)
    );
};

export const getDetailColorService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Chưa gửi lên id để tìm chi tiết màu sắc"));
  }
  const color = await Color.findById(id);
  if (!color) {
    return next(createError(400, `Không tìm thấy sản phẩm với id: ${id}`));
  }
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy chi tiết màu sắc thành công", color));
};

export const updatedColorService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Chưa gửi lên id để tìm chi tiết màu sắc"));
  }
  const color = await Color.findById(id);
  if (!color) {
    return next(createError(400, `Không tìm thấy sản phẩm với id: ${id}`));
  }
  const existingColor = await Color.findOne({
    _id: { $ne: id },
    $or: [{ name: req.body.name }, { hex: req.body.hex }],
  });

  if (existingColor) {
    return next(createError(400, "Đã tồn tại màu sắc trùng tên hoặc mã màu."));
  }
  color.name = req.body.name || color.name;
  color.hex = req.body.hex || color.hex;
  await Color.save();
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy chi tiết màu sắc thành công", color));
};

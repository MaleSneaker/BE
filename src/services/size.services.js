import buildQuery from "../helpers/buildQuery.js";
import Size from "../models/size.model.js";
import createError from "../utils/errorHandle.js";
import createResponse from "../utils/response.js";

export const createSizeService = async (req, res, next) => {
  const existingSize = await Size.findOne({ name: req.body.name });
  if (existingSize) {
    return next(createError(400, "Kích cỡ đã tồn tại"));
  }
  const newSize = await Size.create({ ...req.body });
  return res
    .status(200)
    .json(createResponse(true, 201, "Tạo kích cỡ thành công", newSize));
};

export const getAllSizeService = async (req, res, next) => {
  const { filter, options } = buildQuery(req.query);
  const sizes = await Size.paginate(filter, options);
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy danh sách kích cỡ thành công", sizes));
};

export const getDetailSizeService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Chưa gửi lên id để tìm chi tiết kích cỡ"));
  }
  const size = await Size.findById(id);
  if (!size) {
    return next(createError(400, `Không tìm thấy kích cỡ với id: ${id}`));
  }
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy chi tiết kích cỡ thành công", size));
};

export const updateSizeService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Chưa gửi lên id để tìm chi tiết màu sắc"));
  }
  const size = await Size.findById(id);
  if (!size) {
    return next(createError(400, `Không tìm thấy sản phẩm với id: ${id}`));
  }
  const existingSize = await Size.findOne({
    _id: { $ne: id },
    name: req.body.name,
  });

  if (existingSize) {
    return next(createError(400, "Đã tồn tại kích cỡ này."));
  }
  color.name = req.body.name || color.name;
  await Size.save();
  return res
    .status(200)
    .json(createResponse(true, 200, "Cập nhật kích cỡ thành công", size));
};

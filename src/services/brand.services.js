import buildQuery from "../helpers/buildQuery.js";
import Brand from "../models/brand.model.js";
import createError from "../utils/errorHandle.js";
import createResponse from "../utils/response.js";

export const createBrandService = async (req, res, next) => {
  const existingBrand = await Brand.findOne({ name: req.body.name });
  if (existingBrand) {
    return next(createError(400, "Tên thương hiệu này đã tồn tại"));
  }
  const newBrand = await Brand.create({ ...req.body });
  return res
    .status(201)
    .json(createResponse(true, 201, "Tạo thành công", newBrand));
};

export const updateBrandService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, `Chưa gửi lên ${id}`));
  }
  const foundBrand = await Brand.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  return res
    .status(200)
    .json(createResponse(true, 200, "Cập nhật thành công", foundBrand));
};

export const getAllBrandService = async (req, res, next) => {
  const { filter, options } = buildQuery(req.query);
  const brands = await Brand.paginate(filter, options);
  return res
    .status(200)
    .json(createResponse(true, 200, "Láy danh sách thành công", brands));
};

export const getDetailBrandService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, `Chưa gửi lên ${id}`));
  }
  const brand = await Brand.findById(id);
  console.log(brand);

  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy chi tiết thành công", brand));
};

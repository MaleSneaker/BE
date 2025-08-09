import buildQuery from "../helpers/buildQuery.js";
import Category from "../models/category.model.js";
import createError from "../utils/errorHandle.js";
import createResponse from "../utils/response.js";

export const createCategoryService = async (req, res, next) => {
  const existingCategory = await Category.findOne({ name: req.body.name });
  if (existingCategory) {
    return next(createError(400, "Danh mục này đã tồn tại"));
  }
  const newCategory = await Category.create({ ...req.body });
  return res
    .status(201)
    .json(createResponse(true, 201, "Tạo danh mục thành công", newCategory));
};

export const getAllCategoryService = async (req, res, next) => {
  const { filter, options } = buildQuery(req.query);
  const categories = await Category.paginate(filter, options);
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy danh sách thành công", categories));
};

export const getDetailedCategoryService = async (req, res, next) => {
  //   console.log(req.params);
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Chưa gửi lên id của danh mục"));
  }
  const foundCategory = await Category.findById(id);
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy chi tiết danh mục", foundCategory));
};

export const updateCategoryService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(
      createError(400, !id ? "Chưa gửi lên id của danh mục" : "Validattion")
    );
  }
  const foundCategory = await Category.findById(id);
  if (!foundCategory) {
    return next(createError(400, `Không tìm thấy danh mục với id là ${id}`));
  }

  const existingCategory = await Category.findOne({
    _id: { $ne: id },
    name: req.body.name,
  });
  if (existingCategory) {
    return next(createError(400, "Đã tồn tại danh mục  này."));
  }

  const updateCategory = await Category.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  return res
    .status(200)
    .json(createResponse(true, 200, "Cập nhật thành công", updateCategory));
};

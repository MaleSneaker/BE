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

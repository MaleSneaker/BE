import buildQuery from "../helpers/buildQuery.js";
import Product from "../models/product.model.js";
import createError from "../utils/errorHandle.js";
import createResponse from "../utils/response.js";

export const getAllProductsService = async (req, res, next) => {
  const { filter, options } = buildQuery(req.query);
  const products = await Product.paginate(filter, {
    ...options,
    populate: [
      { path: "brand", select: "name description" },
      { path: "category", select: "name description" },
    ],
  });
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy danh sách thành công", products));
};

export const getDetailProductService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw createError(400, "Chưa có id sản phẩm");
  }
  const { filter } = buildQuery(req.query);
  const product = await Product.findOne({ _id: id, ...filter }).populate([
    { path: "category", select: "name description" },
    { path: "brand", select: "name description" },
  ]);
  if (!product) {
    throw createError(400, "Không tìm thấy sản phẩm");
  }
  return res
    .status(200)
    .json(
      createResponse(true, 200, "Lấy chi tiết sản phẩm thành công", product)
    );
};

export const getRelatedProductService = async (req, res, next) => {
  const { id } = req.params;
  const { filter } = buildQuery(req.query);
  const currentProduct = await Product.findById(id).select("category");
  if (!currentProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  const products = await Product.find({
    category: currentProduct.category,
    _id: { $ne: id },
    ...filter,
  })
    .populate([
      { path: "category", select: "name description" },
      { path: "brand", select: "name description" },
    ])
    .limit(10);
  return res
    .status(200)
    .json(
      createResponse(true, 200, "Lấy sản phẩm liên quan thành công", products)
    );
};

export const createProductService = async (req, res, next) => {
  const existingProduct = await Product.findOne({ name: req.body.name });
  if (existingProduct) {
    throw createError(400, "Tên sản phẩm đã tồn tại!");
  }
  const sizes = [];
  for (let i = 0; i < req.body.sizes.length; i++) {
    if (sizes.some((s) => s.value === req.body.sizes[i].value)) {
      throw createError(400, "Kích cỡ không được trùng nhau!");
    }
    sizes.push(req.body.sizes[i]);
  }
  const newProduct = await Product.create({
    ...req.body,
  });
  return res
    .status(200)
    .json(createResponse(true, 201, "Tạo mới sản phẩm thành công", newProduct));
};

export const updateProductService = async (req, res, next) => {
  const { id } = req.params;
  const existingProduct = await Product.findOne({
    _id: { $ne: id },
    name: req.body.name,
  });
  if (existingProduct) {
    throw createError(400, "Tên sản phẩm đã tồn tại");
  }
  const sizes = [];
  for (let i = 0; i < req.body.sizes.length; i++) {
    if (sizes.some((s) => s.value === req.body.sizes[i].value)) {
      throw createError(400, "Kích cỡ không được trùng nhau!");
    }
    sizes.push(req.body.sizes[i]);
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  return res
    .status(200)
    .json(createResponse(true, 200, "Cập nhật thành công", updatedProduct));
};

export const deleteProductService = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw createError(400, "Chưa có id sản phẩm");
  }
  const findDeletedProduct = await Product.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!findDeletedProduct) {
    throw createError(400, "Sản phẩm này đã bị xoá trước đó");
  }
  findDeletedProduct.isDeleted = true;
  await findDeletedProduct.save();
  return res
    .status(200)
    .json(
      createResponse(true, 200, "Xoá sản phẩm thành công", findDeletedProduct)
    );
};

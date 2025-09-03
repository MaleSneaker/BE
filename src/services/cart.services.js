import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import createError from "../utils/errorHandle.js";
import createResponse from "../utils/response.js";

export const getAllCartServices = async (req, res, next) => {
  const userId = req.user._id;
  const findCart = await Cart.findOne({ userId }).populate({
    path: "items.product",
    select: "-createdAt -updatedAt",
  });

  findCart.items.forEach((item) => {
    if (item.product.stock < item.quantity) {
      item.product.stock = item.quantity;
    }
  });

  await Promise.all(
    findCart.items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product.sizes.includes(item.size.value)) {
        item.size.isAvailable = false;
      }
    })
  );

  await findCart.save();
  return res
    .status(200)
    .json(createResponse(true, 200, "Lấy giỏ hàng thành công", findCart));
};

export const addToCartServices = async (req, res, next) => {
  const userId = req.user._id;
  const product = await Product.findById(req.body.productId);
  if (!product || product.isDeleted) {
    throw createError(400, "Sản phẩm không tồn tại hoặc đã bị xoá");
  }
  const foundSizeInProduct = product.sizes.find(
    (item) => item.value === req.body.size
  );
  if (!foundSizeInProduct) {
    throw createError(400, "Kích cỡ này không tồn tại");
  }
  const currentCart = await Cart.findOne({ userId }).populate({
    path: "items.product",
  });
  if (!currentCart) {
    await Cart.create({ userId, items: [] });
  }
  let updatedCart = null;
  // Nếu có sản phẩm trong giỏ hàng rồi thì tăng số lượng của sản phẩm đó lên
  if (currentCart && currentCart.items.length > 0) {
    const productInCart = currentCart.items.find(
      (item) =>
        item.product._id.toString() === req.body.productId &&
        item.size.value.toLowerCase() === req.body.size.toLowerCase()
    );
    const currentQuantity = productInCart?.quantity || 0;
    let newQuantity = currentQuantity + req.body.quantity;
    updatedCart = await Cart.findOneAndUpdate(
      {
        userId,
        "items.product": req.body.productId,
        "items.size.value": req.body.size,
      },
      {
        $set: {
          "items.$.quantity":
            newQuantity > foundSizeInProduct?.stock
              ? foundSizeInProduct?.stock
              : newQuantity,
        },
      },
      { new: true, upsert: false }
    );
  }

  // Nếu chưa có thì tạo mới trong cart
  if (!updatedCart) {
    if (req.body.quantity > foundSizeInProduct.stock)
      req.body.quantity = foundSizeInProduct.stock;
    updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $push: {
          items: {
            product: req.body.productId,
            "size.value": req.body.size,
            quantity: req.body.quantity,
          },
        },
      },
      {
        new: true,
        upsert: false,
      }
    );
  }
  return res
    .status(200)
    .json(createResponse(true, 200, "Thêm giỏ hàng thành công", updatedCart));
};

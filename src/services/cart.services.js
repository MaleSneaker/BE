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

export const updateQuantityCartServices = async (req, res, next) => {
  const userId = req.user._id;
  let { size: sizeRequest, productId: productRequest, quantity } = req.body;
  const foundCart = await Cart.findOne({
    userId,
    "items.product": productRequest,
    "items.size.value": sizeRequest,
  }).populate({
    path: "items.product",
  });

  if (!foundCart) {
    throw createError(400, "Không tìm thấy sản phẩm này trong giỏ hàng");
  }
  const foundItem = foundCart.items.find(
    (item) => item.product._id.toString() === productRequest
  );
  const foundSize = foundItem.product.sizes.find(
    (item) => item.value === sizeRequest
  );
  if (quantity < 1) {
    quantity = 1;
  }
  if (quantity > foundSize.stock) {
    quantity = foundSize.stock;
  }
  foundItem.quantity = quantity;
  await foundCart.save();
  return res
    .status(200)
    .json(createResponse(true, 200, "Cập nhật giỏ hàng thành công", foundCart));
};


export const deleteFromCartServices = async (req, res, next) => {
  const userId = req.user._id;
  const { productId, size } = req.body;
  if (!productId || !size) {
    throw createError(400, "Thiếu thông tin sản phẩm hoặc kích cỡ cần xóa");
  }
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw createError(404, "Không tìm thấy giỏ hàng");
  }
  const initialLength = cart.items.length;
  cart.items = cart.items.filter(
    (item) =>
      item.product.toString() !== productId ||
      item.size.value.toLowerCase() !== size.toLowerCase()
  );
  if (cart.items.length === initialLength) {
    throw createError(404, "Không tìm thấy sản phẩm trong giỏ hàng");
  }
  await cart.save();

  return res.status(200).json(
    createResponse(true, 200, "Xóa sản phẩm khỏi giỏ hàng thành công", cart)
  );
};

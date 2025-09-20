import Product from "../models/product.model.js";
import createError from "../utils/errorHandle.js";

export const updateInventoryStockCreateOrder = async (items) => {
  await Promise.all(
    items.map(async (item) => {
      const { productId, quantity, size } = item;

      const product = await Product.findById(productId);
      if (!product) {
        throw createError(400, `Sản phẩm với ID ${productId} không tồn tại`);
      }
      const sizeVariant = product.sizes.find((s) => s.value === size);
      if (!sizeVariant) {
        throw createError(400, `Sản phẩm không có size ${size}`);
      }

      if (sizeVariant.stock < quantity) {
        throw createError(
          400,
          `Size ${size} của sản phẩm "${product.name}" chỉ còn ${sizeVariant.stock} trong kho`
        );
      }
      if (sizeVariant.stock === 0) {
        throw createError(
          400,
          `Size ${size} của sản phẩm "${product.name}" đã hết hàng`
        );
      }
      sizeVariant.stock -= quantity;
      product.sold += quantity;

      await product.save();
    })
  );
};

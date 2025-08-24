import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getDetailProduct,
  updatedProduct,
  updateStatusProduct
} from "../controllers/product.controller.js";

const productRoute = Router();

productRoute.get("/all", getAllProducts);
productRoute.get("/detail/:id", getDetailProduct);
productRoute.post("/create", createProduct);
productRoute.patch("/update/:id", updatedProduct);
productRoute.patch("/delete/:id", updateStatusProduct);

export default productRoute;
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  deleteFromCart,
  getAllCart,
  updateQuantityCart,
} from "../controllers/cart.controller.js";

const cartRoute = Router();

cartRoute.use(authMiddleware);

cartRoute.get("/my-cart", getAllCart);
cartRoute.post("/add", addToCart);
cartRoute.patch("/update-quantity", updateQuantityCart);
cartRoute.patch("/remove", deleteFromCart);
export default cartRoute;

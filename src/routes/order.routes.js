import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getDetailMyOrder,
  getMyOrder,
} from "../controllers/order.controller.js";

const orderRoute = Router();

orderRoute.use(authMiddleware);
orderRoute.get("/my-orders", getMyOrder);
orderRoute.get("/my-orders/:id", getDetailMyOrder);
orderRoute.post("/create", createOrder);

export default orderRoute;

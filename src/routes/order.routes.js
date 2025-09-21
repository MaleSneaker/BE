import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrder,
  getDetailMyOrder,
  getDetailOrder,
  getMyOrder,
} from "../controllers/order.controller.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const orderRoute = Router();

orderRoute.use(authMiddleware);
orderRoute.get("/my-orders", getMyOrder);
orderRoute.get("/my-orders/:id", getDetailMyOrder);
orderRoute.post("/create", createOrder);
orderRoute.use(roleMiddleware("admin"));
orderRoute.get("/all", getAllOrder);
orderRoute.get("/detail/:id", getDetailOrder);

export default orderRoute;

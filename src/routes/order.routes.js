import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  cancelOrder,
  createOrder,
  getAllOrder,
  getDetailMyOrder,
  getDetailOrder,
  getMyOrder,
  updateStatusOrder,
} from "../controllers/order.controller.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const orderRoute = Router();

orderRoute.use(authMiddleware);
orderRoute.get("/my-orders", getMyOrder);
orderRoute.get("/my-orders/:id", getDetailMyOrder);
orderRoute.post("/create", createOrder);
orderRoute.patch("/update-status", updateStatusOrder);
orderRoute.patch("cancel", cancelOrder);
orderRoute.use(roleMiddleware("admin"));
orderRoute.get("/all", getAllOrder);
orderRoute.get("/detail/:id", getDetailOrder);

export default orderRoute;

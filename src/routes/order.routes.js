import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  cancelOrder,
  createOrder,
  createPaymentLink,
  getAllOrder,
  getDetailMyOrder,
  getDetailOrder,
  getMyOrder,
  returnPaymentLink,
  updateStatusOrder,
} from "../controllers/order.controller.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const orderRoute = Router();
orderRoute.get('/return', returnPaymentLink)
orderRoute.use(authMiddleware);
orderRoute.get("/my-orders", getMyOrder);
orderRoute.get("/my-orders/:id", getDetailMyOrder);
orderRoute.post("/create", createOrder);
orderRoute.post("/create-payos", createPaymentLink);
orderRoute.patch("/update-status/:id", updateStatusOrder);
orderRoute.patch("/cancel/:id", cancelOrder);
orderRoute.use(roleMiddleware("admin"));
orderRoute.get("/all", getAllOrder);
orderRoute.get("/detail/:id", getDetailOrder);

export default orderRoute;

import { Router } from "express";
import {
  createCategory,
  getALlCategory,
  getDetailed,
  updateCategory,
} from "../controllers/category.controller.js";
import orderRoute from "./order.routes.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/all", getALlCategory);
categoryRouter.get("/detail/:id", getDetailed);
orderRoute.use(authMiddleware, roleMiddleware("admin"));
categoryRouter.post("/create", createCategory);
categoryRouter.patch("/update/:id", updateCategory);

export default categoryRouter;

import { Router } from "express";
import {
  createBrand,
  getAllBrand,
  getDetailBrand,
  updateBrand,
} from "../controllers/brand.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const brandRouter = Router();

brandRouter.get("/all", getAllBrand);
brandRouter.get("/detail/:id", getDetailBrand);
brandRouter.use(authMiddleware, roleMiddleware("admin"));
brandRouter.post("/create", createBrand);
brandRouter.patch("/update/:id", updateBrand);

export default brandRouter;

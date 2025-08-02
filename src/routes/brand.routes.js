import { Router } from "express";
import {
  createBrand,
  getAllBrand,
  getDetailBrand,
  updateBrand,
} from "../controllers/brand.controller.js";

const brandRouter = Router();

brandRouter.get("/all", getAllBrand);
brandRouter.get("/detail/:id", getDetailBrand);
brandRouter.post("/create", createBrand);
brandRouter.patch("/update/:id", updateBrand);

export default brandRouter;

import { Router } from "express";
import {
  createCategory,
  getALlCategory,
  getDetailed,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/all", getALlCategory);
categoryRouter.get("/detail/:id", getDetailed);
categoryRouter.post("/create", createCategory);
categoryRouter.patch("/update/:id", updateCategory);

export default categoryRouter;

import { Router } from "express";
import {
  createColor,
  getAllColor,
  getDetailedColor,
  updateColor,
} from "../controllers/color.controller.js";

const colorRouter = Router();

colorRouter.get("/all", getAllColor);
colorRouter.get("/detail/:id", getDetailedColor);
colorRouter.post("/create", createColor);
colorRouter.patch("/update/:id", updateColor);

export default colorRouter;
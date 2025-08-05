import { Router } from "express";
import {
  createSize,
  getAllSize,
  getDetailedSize,
  updateSize,
} from "../controllers/size.controller.js";

const sizeRouter = Router();

sizeRouter.get("/all", getAllSize);
sizeRouter.get("/detail/:id", getDetailedSize);
sizeRouter.post("/create", createSize);
sizeRouter.patch("/update/:id", updateSize);

export default sizeRouter;
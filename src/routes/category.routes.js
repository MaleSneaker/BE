import { Router } from "express";
import { createCategory } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/create", createCategory);

export default categoryRouter;

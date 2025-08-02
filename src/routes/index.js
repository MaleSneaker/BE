import { Router } from "express";
import authRouter from "./auth.routes.js";
import categoryRouter from "./category.routes.js";
import brandRouter from "./brand.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);

export default router;

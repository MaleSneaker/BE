import { Router } from "express";
import authRouter from "./auth.routes.js";
import categoryRouter from "./category.routes.js";
import brandRouter from "./brand.routes.js";
import sizeRouter from "./size.routes.js";
import colorRouter from "./color.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);
router.use("/sizes", sizeRouter);
router.use("/colors", colorRouter)

export default router;

import { Router } from "express";
import authRouter from "./auth.routes.js";
import brandRouter from "./brand.routes.js";
import categoryRouter from "./category.routes.js";
import uploadRoute from "./upload.routes.js";
import productRoute from "./product.routes.js";
import cartRoute from "./cart.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);
router.use("/upload", uploadRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);
export default router;

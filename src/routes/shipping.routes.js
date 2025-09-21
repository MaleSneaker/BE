import { Router } from "express";
import { getProvince, getWard } from "../controllers/shipping.controller.js";

const shippingRoute = Router();

shippingRoute.get("/province", getProvince);
shippingRoute.get("/ward/:provinceId", getWard);

export default shippingRoute;

import { Router } from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { uploadImage, uploadImages } from "../controllers/upload.controller.js";

const uploadRoute = Router();

uploadRoute.post("/single", upload.single("image"), uploadImage);
uploadRoute.post(
  "/many",
  upload.fields([{ name: "images", maxCount: 5 }]),
  uploadImages
);
export default uploadRoute;

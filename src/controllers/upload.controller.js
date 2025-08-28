import createError from "../utils/errorHandle.js";
import handleASync from "../utils/handleAsync.js";
import createResponse from "../utils/response.js";
import { uploadFiles, uploadSingleFile } from "../utils/cloudinary.js";

export const uploadImage = handleASync(async (req, res, next) => {
  const file = req.file;
  if (!file) {
    throw createError(400, "Bạn chưa upload ảnh");
  }

  const { downloadUrl } = await uploadSingleFile(file);
  return res
    .status(200)
    .json(createResponse(true, 200, "Upload thành công", downloadUrl));
});

export const uploadImages = handleASync(async (req, res, next) => {
  const files = req.files;
  if (!files) {
    throw createError(400, "Bạn chưa upload ảnh");
  }
  const images = [];
  for (const file of files["images"]) {
    const image = await uploadSingleFile(file);
    images.push(image.downloadUrl);
  }
  return res
    .status(200)
    .json(createResponse(true, 200, "Upload thành công", images));
});

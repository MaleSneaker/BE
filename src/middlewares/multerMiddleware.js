import multer from "multer";
import createError from "../utils/errorHandle.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(
        createError(
          400,
          "Chỉ chấp nhận những file có đuôi là JPG, JPEG, PNG, WEBP!"
        )
      );
    }
    cb(null, true);
  },
});

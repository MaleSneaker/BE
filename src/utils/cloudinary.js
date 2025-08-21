import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { CLOUD } from "../constants/cloudinary.js";
cloudinary.config({
  api_key: CLOUD.API_KEY,
  api_secret: CLOUD.API_SECRECT,
  cloud_name: CLOUD.NAME,
});
export const generateId = () =>
  `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const uploadSingleFile = async (file) => {
  const id = generateId();
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "DATN",
        resource_type: "auto",
        public_id: `${file.originalname} - ${id}`,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload fail"));

        resolve({
          downloadUrl: result.secure_url,
          originName: [file.originalname],
        });
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

export const uploadFiles = async (files) => {
  try {
    const uploadedFiles = await Promise.all(
      files.map((file) => uploadSingleFile(file))
    );
    return {
      fileUrls: uploadedFiles.map((item) => item.downloadUrl),
      originNames: uploadedFiles.map((item) => item.originName[0]),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

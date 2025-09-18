import { JWT } from "../constants/jwt.constants.js";
import User from "../models/user.model.js";
import createError from "../utils/errorHandle.js";
import jwt, { decode } from "jsonwebtoken";
import createResponse from "../utils/response.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, "Bạn không được phép!"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(createError(401, "Không thấy token"));
  }

  try {
    const decoded = jwt.verify(token, JWT.SERECT);
    const user = await User.findById(decoded._id).select(
      "role blocked.isBlocked"
    );
    if (!user || user.blocked.isBlocked) {
      return next(createError(401, "Tài khoản không tồn tại hoặc đã bị xoá"));
    }
    req.user = {
      _id: decoded._id,
      email: decoded.email,
      role: user.role,
    };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
        return res.status(401).json(
          createResponse(false, 401, "Token đã hết hạn", { code: "token_expired" })
        );
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json(
          createResponse(false, 401, "Token không hợp lệ", { code: "token_invalid" })
        );
      } else {
        return res.status(500).json(
          createResponse(false, 500, err.message)
        );
      }
    }
};

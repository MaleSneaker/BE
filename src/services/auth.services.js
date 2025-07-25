import User from "../models/user.model.js";
import createError from "../utils/errorHandle.js";
import bcrypt from "bcrypt";
import createResponse from "../utils/response.js";
export const registerService = async (req, res, next) => {
  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    next(createError(400, "Người dùng này đã tồn tại"));
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  const newUser = await User.create(req.body);
  return res
    .status(201)
    .json(createResponse(true, 201, "Đăng ký thành công", newUser));
};

export const loginService = async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    next(createError(400, "Thông tin đăng nhập không"));
  }
  const comparePassword = await bcrypt.compare(password, foundUser.password);
  if (!comparePassword) {
    next(createError(400, "Thong tin dang nhap sai"));
  }
  foundUser.password = undefined;
  return res
    .status(200)
    .json(createResponse(true, 200, "Đăng nhập thành công", foundUser));
};

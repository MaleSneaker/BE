import createError from "../utils/errorHandle.js";

export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (role && roles.includes(role)) {
      return next();
    }
    return next(createError(401, 'Bạn không có quyền!'))
  };
};

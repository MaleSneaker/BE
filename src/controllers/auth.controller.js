import { loginService, registerService } from "../services/auth.services.js";
import handleASync from "../utils/handleAsync.js";

export const register = handleASync(async (req, res, next) => {
  return await registerService(req, res, next);
});

export const login = handleASync(async (req, res, next) => {
  return await loginService(req, res, next);
});

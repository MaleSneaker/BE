import { loginService, registerService } from "../services/auth.services.js";
import handleASync from "../utils/handleAsync.js";


export const register = handleASync(async (red, res, next) =>{
    return await registerService(red, res, next);
});

export const login = handleASync(async (red, res, next) =>{
    return await loginService(red, res, next);
});


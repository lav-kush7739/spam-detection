import { Router } from "express";
import Paths from "./paths/Paths.js";
import AuthController from "../controllers/AuthController.js";
import {
  validateRequest,
  validateUserRegister,
} from "../middleware/validation.js";

const authRouter = Router();
const authController = new AuthController();
console.log('some value ', Paths);

authRouter.post(
  Paths.Auth.register,
  validateUserRegister,
  validateRequest,
  authController.userRegister
);
authRouter.post(Paths.Auth.login, authController.userLogin);

export default authRouter;

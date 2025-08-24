import BaseController from "./BaseController.js";
import { matchedData } from "express-validator";
import { Request, Response } from "express";
import UserService from "../services/UserService.js";
import HttpStatusCode from "../constants/HttpStatusCodes.js";
import  jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt.js";

export default class AuthController extends BaseController {
  public async userRegister(req: Request, res: Response) {
    try {
      const { name, phone, password, email } = matchedData(req);
      const userService = new UserService();
      const id = await userService.userRegister(name, phone, password, email);
      BaseController.sendResponse(
        res,
        HttpStatusCode.OK,
        `User Created Sucessfully with id = ${id}`
      );
    } catch (error: any) {
      BaseController.handleErrors(res, error);
    }
  }
  public async userLogin(req: Request, res: Response) {
    try {
      const { name, phone} = matchedData(req);
      const userService = new UserService();
      const isLoggedIn = await userService.userLogin(name, phone);
      if (isLoggedIn) {
        const token = jwt.sign({ name: name, phone:phone  }, JWT_CONFIG.secret);
        BaseController.sendResponse(
          res,
          HttpStatusCode.OK,
          token
        );
      }
      else {
        BaseController.sendResponse(res, HttpStatusCode.UNAUTHORIZED, 'User is not registered!')
      }

    } catch (error: any) {
      BaseController.handleErrors(res, error);
    }
  }
}

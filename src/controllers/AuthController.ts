import BaseController from "./BaseController.js";
import { matchedData } from "express-validator";
import { Request, Response } from "express";
import UserService from "../services/UserService.js";
import HttpStatusCode from "../constants/HttpStatusCodes.js";

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
      const { name, phone } = matchedData(req);
      const userService = new UserService();
      const isLoggedIn = await userService.userLogin(name, phone);
      if (isLoggedIn) {
        BaseController.sendResponse(
          res,
          HttpStatusCode.OK,
          `User Logged In with name = ${name} and phone = ${phone}`
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

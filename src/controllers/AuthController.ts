import BaseController from "./BaseController.js";
import { matchedData } from "express-validator";
import { Request, Response } from "express";

export interface AuthRequest extends Request {}

export default class AuthController extends BaseController {
  public async userRegister(req: Request, res: Response) {
    const data = matchedData(req);
    console.log("matched data is ", data);
    BaseController.sendJsonResponse(res,200,data);
  }
  public async userLogin() {}
}

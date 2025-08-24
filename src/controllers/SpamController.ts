import { Request, Response } from "express";
import UserService from "../services/UserService.js";
import { matchedData } from "express-validator";
import BaseController from "./BaseController.js";
import HttpStatusCode from "../constants/HttpStatusCodes.js";

export default class SpamController extends BaseController {

        private readonly userService: UserService;
        constructor() {
                super()
                this.userService = new UserService();
        }

        public async markSpam(req: Request, res: Response) {
                const { phone } = matchedData(req, { locations: ['params'] });
                BaseController.sendEmptyResponse(res,HttpStatusCode.OK);

        }

}
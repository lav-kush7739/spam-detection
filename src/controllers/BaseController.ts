import { Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes.js";
export default class BaseController {

  protected static async sendEmptyResponse(res: Response, status_code: HttpStatusCodes) {
    res.status(status_code).send().end();
  }

  protected static sendResponse(
    res: Response,
    status_code: HttpStatusCodes,
    message?: string
  ) {
    res.status(status_code).json({ message: message }).end();
  }

  protected static sendJsonResponse(
    res: Response,
    status_code: HttpStatusCodes,
    data: unknown
  ) {
    res.status(status_code).json(data).end();
  }
}

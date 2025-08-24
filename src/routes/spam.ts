import { Router } from "express";
import Paths from "./paths/Paths.js";
import SpamController from "../controllers/SpamController.js";
import { validatePhone, validateRequest } from "../middleware/validation.js";
import authentiCateToken from "../middleware/authentiCateToken.js";
const spamRouter = Router();
const spamController = new SpamController();

spamRouter.patch(Paths.Spam.mark, validatePhone, validateRequest, authentiCateToken, spamController.markSpam);

export default spamRouter;
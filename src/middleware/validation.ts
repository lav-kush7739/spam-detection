import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "../constants/HttpStatusCodes.js";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ 'Bad Request': result.array() });
  }
  next();
};

export const validateUserRegister = [
  body('name').notEmpty().withMessage('Name must be non-empty').trim().isLength({min:2,max:100}),
  body('phone').notEmpty().withMessage('phone must be non-empty').trim().matches(/^\d{10}$/).withMessage('Must contain 10 digits'),
  body('email').optional().isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password must be non-empty').isLength({min:6}).withMessage('Password must be at least 6 characters')
];

export const validateUserLogin = [
  body('name').notEmpty().withMessage('Name must be non-empty').trim().isLength({min:2,max:100}),
  body('phone').notEmpty().withMessage('phone must be non-empty').trim().matches(/^\d{10}$/).withMessage('Must contain 10 digits')
];



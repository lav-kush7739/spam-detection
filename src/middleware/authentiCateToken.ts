import { Request, Response, NextFunction } from 'express';
import { JWT_CONFIG } from "../config/jwt.js";
import Jwt, { VerifyErrors } from "jsonwebtoken";
import HttpStatusCode from '../constants/HttpStatusCodes.js';

interface AuthRequest extends Request {
        user?: {
                name: string,
                phone: string
        }
}

 const authentiCateToken = (req: AuthRequest, res: Response, next: NextFunction) => {

        const user = req.user;
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
                res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Token is required !' })
        }
        else {
                Jwt.verify(token, JWT_CONFIG.secret, (err: any, decoded: any) => {
                        if (err && err.name === 'TokenExpiredError') {
                                res.status(403).json({ message: "Token Expired error !" });

                        }
                        else if (err && err.name === 'JsonWebTokenError') {
                                res.status(403).json({ message: "the header or payload could not be parsed !" });

                        }
                        else if (err && err.name === 'JsonWebTokenError') {
                                res.status(403).json({ message: "the header or payload could not be parsed !" });

                        }
                        else if(err) {
                                res.status(403).json({ message: err.message });

                        }
                        req.user = decoded;
                        next();


                })
        }



}

export  default authentiCateToken;

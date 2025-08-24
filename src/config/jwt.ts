import { config, configDotenv } from "dotenv";
import dotenv from 'dotenv';
dotenv.config();

export const JWT_CONFIG = {
  secret: process.env.JWT_KEY || '',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
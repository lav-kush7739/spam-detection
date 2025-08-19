import express from "express";
import type { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello  and Good Morning!");
});

export default app;

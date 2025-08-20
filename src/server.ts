import express from "express";
import type { Request, Response } from "express";
import dotenv from 'dotenv';
import Paths from "./routes/paths/Paths.js";
import BaseRouter from "./routes/base.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(Paths.Base, BaseRouter);

export default app;

import { Router } from "express";
import Paths from "./paths/Paths.js";
import AuthRouter from "./auth.js";
import SpamRouter from "./spam.js";
import SearchRouter from "./search.js";

const baseRouter = Router();

baseRouter.use(Paths.Auth.Base,AuthRouter);
baseRouter.use(Paths.Spam.Base,SpamRouter);
baseRouter.use(Paths.Search.Base,SearchRouter);

export default baseRouter;
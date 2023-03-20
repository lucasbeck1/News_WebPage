import { Router } from "express";
import { getArticles } from "../controllers/articlesController";

const articlesRouter = Router();


articlesRouter.get("/", getArticles);


export default articlesRouter;

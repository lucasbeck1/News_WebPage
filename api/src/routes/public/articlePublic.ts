import { Router } from "express";
import {
  getAllArticles,
  getArticlesByAuthor,
  getOneArticle,
} from "../../controllers/articleController";

const router = Router();

router.get("/author", getArticlesByAuthor);

router.get("/:id", getOneArticle);

router.get("/", getAllArticles);

export default router;

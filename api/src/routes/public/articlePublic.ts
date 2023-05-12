import { Router } from "express";
import {
  getAllArticles,
  getArticlesByAuthor,
  getOneArticle,
} from "../../controllers/articleController";

const router = Router();

router.get("/", getAllArticles);

router.get("/author", getArticlesByAuthor);

router.get("/:id", getOneArticle);

export default router;

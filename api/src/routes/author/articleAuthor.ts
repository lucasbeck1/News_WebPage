import { Router } from "express";
import {
  getAllArticles,
  getArticlesByAuthor,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../controllers/articleController";

const router = Router();

router.get("/author", getArticlesByAuthor);

router.get("/:id", getOneArticle);

router.get("/", getAllArticles);

router.post("/", createArticle);

router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;

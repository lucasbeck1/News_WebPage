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

router.get("/", getAllArticles);

router.get("/author", getArticlesByAuthor);

router.get("/:id", getOneArticle);

router.post("/", createArticle);

router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;

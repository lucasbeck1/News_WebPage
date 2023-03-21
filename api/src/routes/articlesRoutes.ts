import { Router } from "express";
import {
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articlesController";

const router = Router();

router.get("/", getAllArticles);

router.get("/:id", getOneArticle);

router.post("/", createArticle);

router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;

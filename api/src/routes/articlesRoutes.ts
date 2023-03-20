import { Router } from "express";
import {
  getAll,
  getOne,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articlesController";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", createArticle);

router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;

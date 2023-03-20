import { Router } from "express";
import {
  getAll,
  getOne,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", createAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

export default router;

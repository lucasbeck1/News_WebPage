import { Router } from "express";
import {
  getAllAuthors,
  getOneAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../controllers/authorController";

const router = Router();

router.get("/", getAllAuthors);

router.get("/:id", getOneAuthor);

router.post("/", createAuthor);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

export default router;

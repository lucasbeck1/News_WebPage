import { Router } from "express";
import {
  getAll,
  getOne,
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/sectionController";

const router = Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", createSection);

router.put("/:id", updateSection);

router.delete("/:id", deleteSection);

export default router;

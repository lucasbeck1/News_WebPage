import { Router } from "express";
import {
  getAllSections,
  getOneSection,
  createSection,
  updateSection,
  deleteSection,
} from "../../controllers/sectionController";

const router = Router();

router.get("/", getAllSections);

router.get("/:id", getOneSection);

router.post("/", createSection);

router.put("/:id", updateSection);

router.delete("/:id", deleteSection);

export default router;

import { Router } from "express";
import {
  getAllPublicity,
  getActivePublicity,
  getOnePublicity,
  createPublicity,
  updatePublicity,
  deletePublicity,
} from "../../controllers/publicityController";

const router = Router();

router.get("/", getAllPublicity);

router.get("/active", getActivePublicity);

router.get("/:id", getOnePublicity);

router.post("/", createPublicity);

router.put("/:id", updatePublicity);

router.delete("/:id", deletePublicity);

export default router;

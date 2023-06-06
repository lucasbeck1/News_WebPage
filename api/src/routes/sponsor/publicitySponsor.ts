import { Router } from "express";
import {
  getPublicityBySponsor,
  createPublicity,
  updatePublicity,
  deletePublicity,
} from "../../controllers/publicityController";

const router = Router();

router.get("/:name", getPublicityBySponsor);

router.post("/", createPublicity);

router.put("/:id", updatePublicity);

router.delete("/:id", deletePublicity);

export default router;

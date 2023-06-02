import { Router } from "express";
import {
  getPublicityBySponsor,
  createPublicity,
} from "../../controllers/publicityController";

const router = Router();

router.get("/:name", getPublicityBySponsor);
router.post("/", createPublicity);

export default router;

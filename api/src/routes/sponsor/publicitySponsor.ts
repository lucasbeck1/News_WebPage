import { Router } from "express";
import {
  getPublicityBySponsor,
  createPublicity,
} from "../../controllers/publicityController";

const router = Router();

router.get("/", getPublicityBySponsor);
router.post("/", createPublicity);

export default router;

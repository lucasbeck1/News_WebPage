import { Router } from "express";
import {
  getAllPublicity,
  createPublicity,
} from "../../controllers/publicityController";

const router = Router();

router.get("/", getAllPublicity);
router.post("/", createPublicity);

export default router;

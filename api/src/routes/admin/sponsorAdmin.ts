import { Router } from "express";
import {
  getAllSponsor,
  getOneSponsor,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "../../controllers/sponsorController";

const router = Router();

router.get("/", getAllSponsor);

router.get("/:id", getOneSponsor);

router.post("/", createSponsor);

router.put("/:id", updateSponsor);

router.delete("/:id", deleteSponsor);

export default router;

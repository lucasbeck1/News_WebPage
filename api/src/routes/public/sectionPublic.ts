import { Router } from "express";
import { getAllSections } from "../../controllers/sectionController";

const router = Router();

router.get("/", getAllSections);

export default router;

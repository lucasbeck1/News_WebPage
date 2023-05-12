import { Router } from "express";
import { getActivePublicity } from "../../controllers/publicityController";

const router = Router();

router.get("/active", getActivePublicity);

export default router;

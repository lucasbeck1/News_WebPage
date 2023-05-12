import { Router } from "express";
import { getOneImage } from "../../controllers/imageController";

const router = Router();

router.get("/:name", getOneImage);

export default router;

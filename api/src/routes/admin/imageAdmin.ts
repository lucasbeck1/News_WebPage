import { Router } from "express";
import { getOneImage, uploadImage } from "../../controllers/imageController";

const router = Router();

router.get("/:name", getOneImage);

router.post("/", uploadImage);

export default router;

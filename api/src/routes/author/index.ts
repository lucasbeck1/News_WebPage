import { Router } from "express";

import articlesRouter from "./articleAuthor";
import imageRouter from "./imageAuthor";

const router = Router();

router.use("/articles", articlesRouter);
router.use("/images", imageRouter);

export default router;

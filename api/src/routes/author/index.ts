import { Router } from "express";
import { authorVerification } from "../../middlewares/auth.middleware";

import articlesRouter from "./articleAuthor";
import imageRouter from "./imageAuthor";

const router = Router();
router.use("/", authorVerification);

router.use("/articles", articlesRouter);
router.use("/images", imageRouter);

export default router;

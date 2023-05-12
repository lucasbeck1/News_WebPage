import { Router } from "express";

import articlesRouter from "./articleAdmin";
import authorRouter from "./authorAdmin";
import sectionRouter from "./sectionAdmin";
import sponsorRouter from "./sponsorAdmin";
import publicityRouter from "./publicityAdmin";
import imageRouter from "./imageAdmin";

const router = Router();

router.use("/articles", articlesRouter);
router.use("/authors", authorRouter);
router.use("/sections", sectionRouter);
router.use("/sponsors", sponsorRouter);
router.use("/publicities", publicityRouter);
router.use("/images", imageRouter);

export default router;

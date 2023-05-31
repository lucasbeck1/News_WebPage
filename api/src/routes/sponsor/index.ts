import { Router } from "express";
import { sponsorVerification } from "../../middlewares/auth.middleware";
import imageRouter from "./imageSponsor";
import publicityRouter from "./publicitySponsor";

const router = Router();
router.use("/", sponsorVerification);

router.use("/publicities", publicityRouter);
router.use("/images", imageRouter);

export default router;

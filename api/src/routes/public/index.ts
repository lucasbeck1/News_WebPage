import { Router } from "express";
import articlesRouter from "./articlePublic";
import authRoutes from "./authPublic";
import imageRoutes from "./imagePublic";
import publicityRoutes from "./publicityPublic";
import sectionRoutes from "./sectionPublic";

const router = Router();

router.use("/articles", articlesRouter);

router.use("/auth", authRoutes);

router.use("/images", imageRoutes);

router.use("/publicities", publicityRoutes);

router.use("/sections", sectionRoutes);

export default router;

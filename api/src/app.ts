// Imports
import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import statusRouter from "./routes/statusRoutes";
import articlesRouter from "./routes/articleRoutes";
import authorRoutes from "./routes/authorRoutes";
import sectionRoutes from "./routes/sectionRoutes";
import sponsorRotes from "./routes/sponsorRoutes";
import publicityRoutes from "./routes/publicityRoutes";
import imageRoutes from "./routes/imageRoutes";

// Express and midlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
const staticPath = path.join(__dirname, "uploads");
app.use(express.static(staticPath));

// Routers
app.use("/status", statusRouter);
app.use("/articles", articlesRouter);
app.use("/authors", authorRoutes);
app.use("/sections", sectionRoutes);
app.use("/sponsors", sponsorRotes);
app.use("/publicities", publicityRoutes);
app.use("/images", imageRoutes);

// Exports
export default app;

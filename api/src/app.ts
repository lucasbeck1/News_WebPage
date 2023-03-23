// Imports
import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import statusRouter from "./routes/statusRoutes";
import articlesRouter from "./routes/articleRoutes";
import authorRoutes from "./routes/authorRoutes";
import sectionRoutes from "./routes/sectionRoutes";
import sponsorRotes from "./routes/sponsorRoutes";
import publicityRoutes from "./routes/publicityRoutes";

// Express and midlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routers
app.use("/status", statusRouter);
app.use("/articles", articlesRouter);
app.use("/authors", authorRoutes);
app.use("/sections", sectionRoutes);
app.use("/sponsors", sponsorRotes);
app.use("/publicities", publicityRoutes);

// Exports
export default app;

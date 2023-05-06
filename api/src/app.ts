// Imports
import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { cookieKey } from "./config";
import statusRouter from "./routes/statusRoutes";
import articlesRouter from "./routes/articleRoutes";
import authorRoutes from "./routes/authorRoutes";
import sectionRoutes from "./routes/sectionRoutes";
import sponsorRotes from "./routes/sponsorRoutes";
import publicityRoutes from "./routes/publicityRoutes";
import imageRoutes from "./routes/imageRoutes";
import authRoutes from "./routes/authRoutes";

// Express and midlewares
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(cookieKey));
const staticPath = path.join(__dirname, "uploads");
app.use(express.static(staticPath));
/* 
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}); 
*/

// Routers
app.use("/status", statusRouter);
app.use("/articles", articlesRouter);
app.use("/authors", authorRoutes);
app.use("/sections", sectionRoutes);
app.use("/sponsors", sponsorRotes);
app.use("/publicities", publicityRoutes);
app.use("/images", imageRoutes);
app.use("/auth", authRoutes);

// Exports
export default app;

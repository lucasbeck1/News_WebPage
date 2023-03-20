// Imports
import express from "express";
import morgan from "morgan";
import cors from "cors";
import statusRouter from "./routes/statusRoutes";
import articlesRouter from "./routes/articlesRoutes";
import "reflect-metadata";

// Express and midlewares
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routers
app.use("/status", statusRouter);
app.use("/articles", articlesRouter);

// Exports
export default app;

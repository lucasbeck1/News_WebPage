// Imports
import express from "express";
import statusRouter from "./routes/statusRoutes";
import articlesRouter from "./routes/articlesRoutes";

// Express and midlewares
const app = express();
app.use(express.json());

// Routers
app.use("/status", statusRouter);
app.use("/articles", articlesRouter);

// Exports
export default app;

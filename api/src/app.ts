// Imports
import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { cookieKey } from "./config";
import publicRouter from "./routes/public";
import authorRouter from "./routes/author";
import adminRouter from "./routes/admin";

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
app.use("/public", publicRouter);
app.use("/author", authorRouter);
app.use("/admin", adminRouter);

// Exports
export default app;

// Imports
import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import session from "express-session";
import { cookieKey } from "./config/keys.config";
import myPassport from "./config/passport.config";
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

app.use(
  session({
    secret: cookieKey,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(myPassport.initialize());
app.use(myPassport.session());

// Routers
app.use("/public", publicRouter);
app.use("/author", authorRouter);
app.use("/admin", adminRouter);

// Exports
export default app;

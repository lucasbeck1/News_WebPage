// Imports
import express from "express";
import statusRouter  from "./routes/statusRoutes";


// Express and midlewares
const app = express();
app.use(express.json());


// Routers
app.use("/status", statusRouter);

// Exports
export default app;

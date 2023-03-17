// Imports
import express from "express";
import { statusApi } from "./controllers/status";


// Express and midlewares
const app = express();
app.use(express.json());


// Routers
statusApi(app);


// Exports
export default app;

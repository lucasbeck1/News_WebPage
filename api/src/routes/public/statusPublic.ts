import { Router } from "express";
import { statusApi } from "../../controllers/statusController";

const statusRouter = Router();

statusRouter.get("/", statusApi);

export default statusRouter;

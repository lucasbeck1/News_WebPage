import { Router } from "express";
import { login, logOut, register } from "../../controllers/authController";

const router = Router();

router.get("/logout", logOut);

router.post("/login", login);

router.post("/register", register);

export default router;

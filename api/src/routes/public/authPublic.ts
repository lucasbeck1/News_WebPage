import { Router } from "express";
import { login, logOut, register } from "../../controllers/authController";
import myPassport from "../../config/passport.config";

const router = Router();

router.get("/logout", logOut);

router.post("/login", myPassport.authenticate("local"), login);

router.post("/register", register);

export default router;

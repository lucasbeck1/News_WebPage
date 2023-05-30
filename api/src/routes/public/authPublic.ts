import { Router } from "express";
import { login, logOut } from "../../controllers/authController";
import { createAuthor } from "../../controllers/authorController";
import myPassport from "../../config/passport.config";

const router = Router();

router.get("/logout", logOut);

router.post("/login", myPassport.authenticate("local"), login);

router.post("/register", createAuthor);

export default router;

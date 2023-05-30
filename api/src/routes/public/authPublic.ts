import { Router } from "express";
import { login, logOut } from "../../controllers/authController";
import { createAuthor } from "../../controllers/authorController";
import { createSponsor } from "../../controllers/sponsorController";

import myPassport from "../../config/passport.config";

const router = Router();

router.get("/logout", logOut);

router.post("/login", myPassport.authenticate("local"), login);

router.post("/loginSponsor", myPassport.authenticate("local"), login);

router.post("/register", createAuthor);

router.post("/registerSponsor", createSponsor);

export default router;

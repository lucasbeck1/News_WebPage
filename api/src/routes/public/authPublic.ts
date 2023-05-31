import { Router } from "express";
import { createSponsor } from "../../controllers/sponsorController";
import {
  login,
  logOut,
  loginSponsor,
  logOutSponsor,
} from "../../controllers/authController";
import myPassport from "../../config/passport.config";

const router = Router();

router.get("/logout", logOut);
router.get("/logoutSponsor", logOutSponsor);

router.post("/login", myPassport.authenticate("local"), login);
router.post("/loginSponsor", loginSponsor);

router.post("/registerSponsor", createSponsor);

export default router;

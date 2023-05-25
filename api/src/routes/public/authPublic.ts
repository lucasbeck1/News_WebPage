import { Router } from "express";

import { login, logOut, register } from "../../controllers/authController";

import myPassport from "../../middlewares/passport.middleware";

/* type Info = {
  message: string;
};

type User = {
  id: string;
  mail: string;
  password: string;
}; */

const router = Router();

router.get("/logout", logOut);

router.post("/login", myPassport.authenticate("local"), login);

/* router.post(
  "/login",
  function (req, res, next) {
    myPassport.authenticate(
      "local",
      function (err: Error, user: User, info: Info) {
        if (err) return res.status(500).send();
        if (!user) return res.status(400).json({ error: info.message });
        req.logIn(user, function (err) {
          if (err) return next(err);
          res.status(200).json(info.message);
          return next();
        });
        return next();
      }
    )(req, res, next);
  },
  login
); */

router.post("/register", register);

export default router;

import passport from "passport";
import { Strategy } from "passport-local";

import { Author } from "../entities/authorEntity";

import bcrypt from "bcrypt";

type User = {
  id: string;
};

const myPassport = new passport.Passport();

myPassport.use(
  new Strategy(function (username, password, done) {
    Author.findOne({
      where: { mail: username },
      select: { id: true, password: true, admin: true, name: true },
    })
      .then(async (user) => {
        if (!user) {
          return done(null, false);
        }
        const checkPass: boolean = await bcrypt.compare(
          password,
          user.password
        );
        if (!checkPass) {
          return done(null, false);
        }
        return done(null, {
          id: user.id,
        });
      })
      .catch((err) => {
        return done(err);
      });
  })
);

myPassport.serializeUser(function (user, done) {
  done(null, user);
});

myPassport.deserializeUser(function (user: User, done) {
  Author.findOneBy({ id: user.id })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      done(null, {
        id: user.id,
        admin: user.admin,
        name: user.name,
      });
    })
    .catch((err) => {
      return done(err);
    });
});

export default myPassport;

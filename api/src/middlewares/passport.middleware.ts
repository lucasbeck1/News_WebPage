import passport from "passport";
import { Strategy } from "passport-local";

import { Author } from "../entities/authorEntity";
//import { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";

type User = {
  id: string;
  mail: string;
  password: string;
};

const myPassport = new passport.Passport();

myPassport.use(
  new Strategy(function (username, password, done) {
    console.log("------------ USER AQUI ---------------");
    console.log(username, password);
    Author.findOneBy({ mail: username })
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
        return done(null, user);
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
  Author.findOne({ where: { id: user.id } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

export default myPassport;

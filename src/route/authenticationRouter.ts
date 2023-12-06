const express = require("express");
const passport = require("passport");
const authentication = require("../controller/authentication");
import { UserEntity } from "../entity/userEntity";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: unknown, user: UserEntity, info: unknown) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          console.log("Can't find User");
          return next(err);
        } else {
          req.user = user;
          return next();
        }
      }
    )(req, res, next);
  }
}

router.post("/signup", authentication.signup);
router.post("/login", authentication.login);

module.exports = router;

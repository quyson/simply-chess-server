import "./config/passport";
import express from "express";
import passport from "passport";
import { register, login } from "../controller/authentication";
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

router.post("/signup", register);
router.post("/login", login);

export default router;

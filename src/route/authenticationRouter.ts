import express from "express";
import { register, login } from "../controller/authentication";
import { UserEntity } from "../entity/userEntity";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import CustomError from "../config/error";

const router = express.Router();

const secretOrKey: string = process.env.SECRET_KEY as string;

const Authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, secretOrKey, (err, decoded) => {
        if (err) {
          next(err);
        } else {
          console.log("decoded!", decoded);
          req.body.user = decoded;
        }
      });
    }
  }
};

router.post("/signup", register);
router.post("/login", login);
router.post("/protected", Authenticate);

export default router;

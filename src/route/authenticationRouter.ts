import express from "express";
import { register, login } from "../controller/authentication";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Decoded from "../interface/decodedExtendsRequest";
import CustomError from "../config/error";

const router = express.Router();

const secretOrKey: string = process.env.SECRET_KEY as string;

const Authenticate = (req: Decoded, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (token) {
      jwt.verify(token, secretOrKey, (err, decoded) => {
        if (err) {
          next(err);
        } else {
          console.log("decoded!", decoded);
          const username = (decoded! as jwt.JwtPayload).username;
          req.username = username;
          next();
        }
      });
    }
  } else {
    res.status(401).json({ Message: "Invalid Token" });
  }
};

router.post("/register", register);
router.post("/login", login);
router.post(
  "/protected",
  Authenticate,
  (req: Decoded, res: Response, next: NextFunction) => {
    res.send(req.username);
  }
);

export default router;

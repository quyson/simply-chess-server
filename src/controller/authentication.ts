import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../config/error";
import { CreateUser, GetUser } from "../service/databaseOperations";
import { User } from "../models/user";
import sqlConfig from "../config/database";
import dotenv from "dotenv";
dotenv.config();

const secretOrKey = process.env.SECRET_KEY;

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const foundUser = await GetUser(sqlConfig, req.body.username);
  if (foundUser) {
    const err = new CustomError("Username is already taken!", 422);
    res.status(err.status).send(err.message);
  }
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
  const newUser = new User(req.body.username, hashedPassword);
  const userDB = await CreateUser(
    sqlConfig,
    newUser.getName(),
    hashedPassword,
    newUser.getElo(),
    newUser.getWins(),
    newUser.getLosses(),
    newUser.getRank()
  );
  if (userDB) {
    res.status(200).send("Successfully Registered!");
  } else {
    res.status(404).send("Unable to Register!");
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("username", req.body.username);
  const foundUser = await GetUser(sqlConfig, req.body.username);
  if (!foundUser) {
    const err = new CustomError("Cannot find User!", 404);
    res.status(err.status).send(err.message);
  }
  const match: boolean = await bcrypt.compare(
    req.body.password,
    foundUser.password
  );
  if (match) {
    const payload = { id: foundUser!.getID(), username: foundUser!.getName() };
    const token: string = jwt.sign(payload, secretOrKey!, { expiresIn: "1d" });
    res.status(200).send({
      message: "Logged in successfully",
      token: "Bearer " + token,
    });
  } else {
    const err = new CustomError("Username or Password does not match!", 401);
    res.status(err.status).send(err.message);
  }
};

export { register, login };

import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../database/appDataSource";
import { UserEntity } from "../entity/userEntity";
import { Rank } from "../entity/userEntity";
import User from "../interface/models/user";
import CustomError from "../config/error";
import dotenv from "dotenv";
dotenv.config();

const secretOrKey = process.env.SECRET_KEY;

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(UserEntity);
  const foundUser = await userRepository.findOne({
    where: { username: req.body.username },
  });

  if (foundUser) {
    const err = new CustomError("Username is already taken!", 422);
    res.status(err.status).send(err.message);
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  const newUser = new UserEntity();
  newUser.username = req.body.username;
  newUser.password = hashedPassword;
  newUser.elo = 0;
  newUser.rank = Rank.Iron;

  userRepository
    .save(newUser)
    .then((result) => {
      res
        .status(200)
        .send({ message: `Successfully Registered ${newUser.username}` });
    })
    .catch((error) => {
      console.log("Register Method", error);
      next(error);
    });
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(UserEntity);
  const result = await userRepository.findOne({
    where: { username: req.body.username },
  });
  if (!result) {
    const err = new CustomError("Cannot find User!", 404);
    res.status(err.status).send(err.message);
  }
  const match: boolean = await bcrypt.compare(
    req.body.password,
    result!.password
  );
  if (match) {
    const payload = { id: result!.id, username: result!.username };
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

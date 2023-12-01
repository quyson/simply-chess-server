const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import AppDataSource from "../program";
import { UserEntity } from "../entity/userEntity";
import { Rank } from "../entity/userEntity";
import User from "../interface/models/user";
require("dotenv").config();
import CustomError from "../config/error";

const register = async (req, res, next) => {
  const userRepository = AppDataSource.getRepository(UserEntity);
  const foundUser = await userRepository.findOne({
    where: { username: req.body.username },
  });

  if (foundUser) {
    const err = new CustomError("Username is already taken!", 422);
    res.status(err.status).send(err.message);
  }

  const hashedPassword = bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      return hashedPassword;
    })
    .catch((error) => {
      next(error);
    });

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

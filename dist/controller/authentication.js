"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.register = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const program_1 = __importDefault(require("../program"));
const userEntity_1 = require("../entity/userEntity");
const userEntity_2 = require("../entity/userEntity");
require("dotenv").config();
const error_1 = __importDefault(require("../config/error"));
const secretOrKey = process.env.SECRET_KEY;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = program_1.default.getRepository(userEntity_1.UserEntity);
    const foundUser = yield userRepository.findOne({
        where: { username: req.body.username },
    });
    if (foundUser) {
        const err = new error_1.default("Username is already taken!", 422);
        res.status(err.status).send(err.message);
    }
    const hashedPassword = yield bcrypt.hash(req.body.password, 10);
    const newUser = new userEntity_1.UserEntity();
    newUser.username = req.body.username;
    newUser.password = hashedPassword;
    newUser.elo = 0;
    newUser.rank = userEntity_2.Rank.Iron;
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
});
exports.register = register;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = program_1.default.getRepository(userEntity_1.UserEntity);
    const result = yield userRepository.findOne({
        where: { username: req.body.username },
    });
    if (!result) {
        const err = new error_1.default("Cannot find User!", 404);
        res.status(err.status).send(err.message);
    }
    const match = yield bcrypt.compare(req.body.password, result.password);
    if (match) {
        const payload = { id: result.id, username: result.username };
        const token = jwt.sign(payload, secretOrKey, { expiresIn: "1d" });
        return res.status(200).send({
            message: "Logged in successfully",
            token: "Bearer " + token,
        });
    }
    else {
        const err = new error_1.default("Username or Password does not match!", 401);
        res.status(err.status).send(err.message);
    }
});
exports.Login = Login;

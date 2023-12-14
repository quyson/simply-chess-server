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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../config/error"));
const databaseOperations_1 = require("../service/databaseOperations");
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretOrKey = process.env.SECRET_KEY;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.username, req.body.password);
    const foundUser = yield (0, databaseOperations_1.GetUser)(database_1.default, req.body.username);
    if (foundUser) {
        const err = new error_1.default("Username is already taken!", 422);
        res.status(err.status).send(err.message);
    }
    console.log("Did not find user, will register now!");
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
    const newUser = new user_1.User(req.body.username, hashedPassword);
    const userDB = yield (0, databaseOperations_1.CreateUser)(database_1.default, newUser.getName(), hashedPassword, newUser.getElo(), newUser.getWins(), newUser.getLosses(), newUser.getRank());
    if (userDB) {
        res.status(200).send("Successfully Registered!");
    }
    else {
        res.status(404).send("Unable to Register!");
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("username", req.body.username);
    const foundUser = yield (0, databaseOperations_1.GetUser)(database_1.default, req.body.username);
    if (!foundUser) {
        const err = new error_1.default("Cannot find User!", 404);
        res.status(err.status).send(err.message);
    }
    const match = yield bcryptjs_1.default.compare(req.body.password, foundUser.getPassword());
    if (match) {
        const payload = { id: foundUser.getID(), username: foundUser.getName() };
        const token = jsonwebtoken_1.default.sign(payload, secretOrKey, { expiresIn: "1d" });
        res.status(200).send({
            message: "Logged in successfully",
            token: "Bearer " + token,
        });
    }
    else {
        const err = new error_1.default("Username or Password does not match!", 401);
        res.status(err.status).send(err.message);
    }
});
exports.login = login;

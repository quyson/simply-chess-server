"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controller/authentication");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const secretOrKey = process.env.SECRET_KEY;
const Authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log(token);
        if (token) {
            jsonwebtoken_1.default.verify(token, secretOrKey, (err, decoded) => {
                if (err) {
                    next(err);
                }
                else {
                    console.log("decoded!", decoded);
                    const username = decoded.username;
                    req.username = username;
                    next();
                }
            });
        }
    }
    else {
        res.status(401).json({ Message: "Invalid Token" });
    }
};
router.post("/register", authentication_1.register);
router.post("/login", authentication_1.login);
router.post("/protected", Authenticate, (req, res, next) => {
    res.send(req.username);
});
exports.default = router;

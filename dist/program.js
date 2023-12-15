"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationRouter_1 = __importDefault(require("./route/authenticationRouter"));
//import "reflect-metadata";
const chessLogic_1 = __importDefault(require("./controller/chessLogic"));
const databaseOperations_1 = require("./service/databaseOperations");
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT,
        credentials: true,
    },
});
io.use((socket, next) => {
    if (socket.handshake.query &&
        socket.handshake.query.token &&
        typeof socket.handshake.query.token === "string") {
        const token = socket.handshake.query.token.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                next(err);
            }
            if (!decoded) {
                return next(new Error("Invalid token"));
            }
            socket.decoded = decoded;
            console.log("authenticated!", decoded);
            next();
        });
    }
    else {
        next(new Error("Authentication error"));
    }
}).on("connection", (socket) => {
    socket.on("joinChessRoom", () => {
        console.log("joining!");
        (0, chessLogic_1.default)(io, socket);
    });
    socket.on("message", (message) => {
        console.log(message);
        io.emit("message", message);
    });
});
(0, databaseOperations_1.ConnectServer)(database_1.default)
    .then((result) => {
    console.log("DB Connected", result);
})
    .catch((error) => {
    console.log("DB Error", error);
})
    .then((result) => {
    httpServer.listen(process.env.PORT, () => {
        console.log("Server is RUnning!");
    });
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(authenticationRouter_1.default);
app.use((err, req, res, next) => {
    console.error("Error:", err);
    if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid token" });
    }
    else {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

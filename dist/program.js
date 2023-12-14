"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authenticationRouter_1 = __importDefault(require("./route/authenticationRouter"));
const databaseOperations_1 = require("./service/databaseOperations");
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, databaseOperations_1.ConnectServer)(database_1.default)
    .then((result) => {
    console.log("DB Connected", result);
})
    .catch((error) => {
    console.log("DB Error", error);
})
    .then((result) => {
    app.listen(process.env.PORT, () => {
        console.log("Server is RUnning!");
    });
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(authenticationRouter_1.default);
/*const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT,
  },
});

interface CustomSocket extends Socket {
  decoded?: any;
}

io.use((socket: CustomSocket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token as string,
      process.env.SECRET_KEY as string,
      (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  // Connection now authenticated to receive further events
  initializeGame(io, socket);
  socket.on("message", function (message) {
    io.emit("message", message);
  });
});

httpServer.listen(process.env.PORT);*/

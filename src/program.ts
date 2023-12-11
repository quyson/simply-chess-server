import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";
import router from "./route/authenticationRouter";
import "reflect-metadata";
import AppDataSource from "./database/appDataSource";
import initializeGame from "./controller/chessLogic";
import { Socket } from "socket.io";
const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("./config/passport");
app.use(router);

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
app.listen(process.env.PORT, () => {
  console.log("Server is RUnning!");
});
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

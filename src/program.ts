import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";
import router from "./route/authenticationRouter";
//import "reflect-metadata";
import initializeGame from "./controller/chessLogic";
import { Socket } from "socket.io";
import { ConnectServer } from "./service/databaseOperations";
import sqlConfig from "./config/database";
import { Request, Response, NextFunction } from "express";
const app = express();
dotenv.config();

ConnectServer(sqlConfig)
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

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);

  if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).json({ message: "Invalid token" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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

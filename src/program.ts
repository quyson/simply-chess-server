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

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT,
    credentials: true,
  },
});

interface CustomSocket extends Socket {
  decoded?: jwt.JwtPayload;
}

io.use((socket: CustomSocket, next) => {
  if (
    socket.handshake.query &&
    socket.handshake.query.token &&
    typeof socket.handshake.query.token === "string"
  ) {
    const token = socket.handshake.query.token.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
      if (err) {
        next(err);
      }
      if (!decoded) {
        return next(new Error("Invalid token"));
      }
      socket.decoded = decoded as jwt.JwtPayload;
      console.log("authenticated!", decoded);
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket: CustomSocket) => {
  socket.on("joinChessRoom", () => {
    console.log("joining!");
    initializeGame(io, socket);
  });

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

ConnectServer(sqlConfig)
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

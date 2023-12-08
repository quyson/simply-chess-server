import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import router from "./route/authenticationRouter";
import passport from "passport";
const session = require("express-session");
import "reflect-metadata";
import AppDataSource from "./database/appDataSource";
import initializeGame from "./controller/chessLogic";
const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");
app.use(router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT,
  },
});

io.on("connection", (client) => {
  initializeGame(io, client);
});

httpServer.listen(process.env.PORT);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

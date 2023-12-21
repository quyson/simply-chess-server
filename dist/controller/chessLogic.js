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
const databaseOperations_1 = require("../service/databaseOperations");
const match_1 = __importDefault(require("../models/match"));
const database_1 = __importDefault(require("../config/database"));
var io;
var gameSocket;
var gamesInSession = [];
const initializeGame = (sio, socket) => {
    /**
     * initializeGame sets up all the socket event listeners.
     */
    // initialize global variables.
    io = sio;
    gameSocket = socket;
    // pushes this socket to an array which stores all the active sockets.
    gamesInSession.push(gameSocket);
    // Run code when the client disconnects from their socket session.
    gameSocket.on("disconnect", onDisconnect);
    // Sends new move to the other socket session in the same room.
    gameSocket.on("handle move", handleMove);
    // User creates new game room after clicking 'submit' on the frontend
    gameSocket.on("createNewGame", createNewGame);
    // User joins gameRoom after going to a URL with '/game/:gameId'
    gameSocket.on("playerJoinGame", playerJoinsGame);
    gameSocket.on("send username", sendUserName);
    gameSocket.on("won game", wonGame);
    gameSocket.on("loss game", lossGame);
    //gameSocket.on("recieve userName", recieveUserName);
};
function playerJoinsGame(idData) {
    /**
     * Joins the given socket to a session with it's gameId
     */
    console.log("JOIN ROOM 1");
    // A reference to the player's Socket.IO socket object
    var sock = this;
    console.log(idData.gameId);
    // Look up the room ID in the Socket.IO manager object.
    var room = io.sockets.adapter.rooms.get(idData.gameId);
    console.log(room);
    // If the room exists...
    if (room === undefined) {
        this.emit("status", "This game session does not exist.");
        return;
    }
    if (room.size < 2) {
        // attach the socket id to the data object.
        idData.player2SocketId = sock.id;
        // Join the room
        sock.join(idData.gameId);
        console.log(room.size);
        if (room.size === 2) {
            console.log("IDDATA", idData);
            io.sockets.in(idData.gameId).except(sock.id).emit("start game", idData);
        }
        // Emit an event notifying the clients that the player has joined the room.
        //io.sockets.in(idData.gameId!).emit("playerJoinedRoom", idData);
    }
    else {
        // Otherwise, send an error message back to the player.
        this.emit("status", "There are already 2 people playing in this room.");
    }
}
function createNewGame(gameId) {
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    console.log(this.id);
    this.emit("createNewGame", gameId, this.id);
    // Join the Room and wait for the other player
    this.join(gameId);
}
function onDisconnect() {
    var i = gamesInSession.indexOf(gameSocket);
    gamesInSession.splice(i, 1);
}
function sendUserName(gameId, username) {
    console.log("send information stuff", gameId, username, this.id);
    io.to(gameId).except(this.id).emit("give username", username, gameId);
}
function handleMove(move, gameId) {
    console.log("Move", move, "gameId", gameId);
    io.to(gameId).except(this.id).emit("opponent move", move);
}
function wonGame(username, opponent) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, databaseOperations_1.updateAfterWin)(database_1.default, username);
        const newMatch = new match_1.default(username, opponent);
        yield (0, databaseOperations_1.CreateMatch)(database_1.default, newMatch);
    });
}
function lossGame(username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, databaseOperations_1.updateAfterLoss)(database_1.default, username);
    });
}
exports.default = initializeGame;

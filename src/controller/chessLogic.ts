import { Socket } from "socket.io";
import { Server } from "socket.io";
import {
  CreateMatch,
  updateAfterLoss,
  updateAfterWin,
} from "../service/databaseOperations";
import Match from "../models/match";
import sqlConfig from "../config/database";

var io: Server;
var gameSocket: Socket;
var gamesInSession: Socket[] = [];

type gameData = {
  player2SocketId?: string;
  player1SocketId?: string;
  gameId?: string;
  username?: string;
};

const initializeGame = (sio: Server, socket: Socket) => {
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
  gameSocket.on("new move", newMove);

  // User creates new game room after clicking 'submit' on the frontend
  gameSocket.on("createNewGame", createNewGame);

  // User joins gameRoom after going to a URL with '/game/:gameId'
  gameSocket.on("playerJoinGame", playerJoinsGame);

  gameSocket.on("send username", sendUserName);

  gameSocket.on("won game", wonGame);

  gameSocket.on("loss game", lossGame);

  //gameSocket.on("recieve userName", recieveUserName);
};

function playerJoinsGame(this: Socket, idData: gameData) {
  /**
   * Joins the given socket to a session with it's gameId
   */

  // A reference to the player's Socket.IO socket object
  var sock = this;

  // Look up the room ID in the Socket.IO manager object.
  var room = io.sockets.adapter.rooms.get(idData.gameId!);
  // console.log(room)

  // If the room exists...
  if (room === undefined) {
    this.emit("status", "This game session does not exist.");
    return;
  }
  if (room.size < 2) {
    // attach the socket id to the data object.
    idData.player2SocketId = sock.id;

    // Join the room
    sock.join(idData.gameId!);

    console.log(room.size);

    if (room.size === 2) {
      io.sockets.in(idData.gameId!).emit("start game", idData);
    }

    // Emit an event notifying the clients that the player has joined the room.
    //io.sockets.in(idData.gameId!).emit("playerJoinedRoom", idData);
  } else {
    // Otherwise, send an error message back to the player.
    this.emit("status", "There are already 2 people playing in this room.");
  }
}

function createNewGame(this: Socket, gameId: string) {
  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  this.emit("createNewGame", { gameId: gameId, mySocketId: this.id });

  // Join the Room and wait for the other player
  this.join(gameId);
}

function newMove(move: gameData) {
  /**
   * First, we need to get the room ID in which to send this message.
   * Next, we actually send this message to everyone except the sender
   * in this room.
   */

  const gameId = move.gameId;

  io.to(gameId!).emit("opponent move", move);
}

function onDisconnect() {
  var i = gamesInSession.indexOf(gameSocket);
  gamesInSession.splice(i, 1);
}

function sendUserName(gameId: string, username: string) {
  io.to(gameId).emit("give username", username);
}

async function wonGame(username: string, opponent: string) {
  await updateAfterWin(sqlConfig, username);
  const newMatch = new Match(username, opponent);
  await CreateMatch(sqlConfig, newMatch);
}

async function lossGame(username: string) {
  await updateAfterLoss(sqlConfig, username);
}

/*function recieveUserName(username: string, gameId: string) {
  io.to(gameId!).emit("get Opponent UserName", username);
}*/

export default initializeGame;

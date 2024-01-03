import { Socket } from "socket.io";
import { Server } from "socket.io";
import {
  CreateMatch,
  updateAfterLoss,
  updateAfterWin,
} from "../service/databaseOperations";
import Match from "../models/match";
import sqlConfig from "../config/database";
import Move from "../interface/move";

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
  gameSocket.on("handle move", handleMove);

  // User creates new game room after clicking 'submit' on the frontend
  gameSocket.on("createNewGame", createNewGame);

  // User joins gameRoom after going to a URL with '/game/:gameId'
  gameSocket.on("playerJoinGame", playerJoinsGame);

  gameSocket.on("send username", sendUserName);

  //gameSocket.on("won game", wonGame);

  //gameSocket.on("loss game", lossGame);

  //gameSocket.on("recieve userName", recieveUserName);
};

function playerJoinsGame(this: Socket, idData: gameData) {
  /**
   * Joins the given socket to a session with it's gameId
   */
  console.log("JOIN ROOM 1");
  // A reference to the player's Socket.IO socket object
  var sock = this;
  console.log(idData.gameId);
  // Look up the room ID in the Socket.IO manager object.
  var room = io.sockets.adapter.rooms.get(idData.gameId!);
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
    sock.join(idData.gameId!);

    console.log(room.size);

    if (room.size === 2) {
      console.log("IDDATA", idData);
      io.sockets.in(idData.gameId!).except(sock.id).emit("start game", idData);
    }

    // Emit an event notifying the clients that the player has joined the room.
    //io.sockets.in(idData.gameId!).emit("playerJoinedRoom", idData);
  } else {
    // Otherwise, send an error message back to the player.
    this.to(this.id).emit(
      "status",
      "There are already 2 people playing in this room."
    );
  }
}

function createNewGame(this: Socket, gameId: string) {
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

function sendUserName(this: Socket, gameId: string, username: string) {
  console.log("send information stuff", gameId, username, this.id);
  io.to(gameId).except(this.id).emit("give username", username, gameId);
}

function handleMove(this: Socket, move: string, gameId: string) {
  console.log("Move", move, "gameId", gameId);
  io.to(gameId).except(this.id).emit("opponent move", move);
}

/*async function wonGame(username: string, opponent: string) {
  await updateAfterWin(sqlConfig, username);
  const newMatch = new Match(username, opponent);
  await CreateMatch(sqlConfig, newMatch);
}

async function lossGame(username: string) {
  await updateAfterLoss(sqlConfig, username);
}*/

export default initializeGame;

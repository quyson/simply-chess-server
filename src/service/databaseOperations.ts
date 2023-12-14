import sql from "mssql";
import Config from "../interface/database";
import { Rank, User } from "../models/user";
import Match from "../models/match";
import dbUser from "../interface/dbuser";

const ConnectServer = async (config: Config) => {
  try {
    const result = await sql.connect(config);
    return result;
  } catch (err) {
    console.log("config error", err);
  }
};

const GetUser = async (config: Config, username: string) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", sql.VarChar, username)
      .query("select * from users where username = @input_parameter");
    const user: dbUser = result.recordset[0];
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const CreateUser = async (
  config: Config,
  username: string,
  password: string,
  elo: number,
  wins: number,
  losses: number,
  rank: Rank
) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter1", sql.VarChar, username)
      .input("input_parameter2", sql.VarChar, password)
      .input("input_parameter3", sql.Int, elo)
      .input("input_parameter4", sql.Int, wins)
      .input("input_parameter5", sql.Int, losses)
      .input("input_parameter6", sql.VarChar, rank)
      .query(
        "insert into users (username, password, elo, wins, losses, rank) values(@input_parameter1, @input_parameter2, @input_parameter3, @input_parameter4, @input_parameter5, @input_parameter6)"
      );
    console.log(result);
    return true;
  } catch (err) {
    console.log(err);
  }
};

const updateAfterWin = async (
  config: Config,
  username: string,
  updatedWins: number
) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("inputparameter1", sql.Int, updatedWins)
      .input("inputparameter2", sql.VarChar, username)
      .query(
        "update users set (wins) values(@inputparameter1) where username = @inputparameter2"
      );
    console.log("Update Win", result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateAfterLoss = async (
  config: Config,
  username: string,
  updatedLosses: number
) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("inputparameter1", sql.Int, updatedLosses)
      .input("inputparameter2", sql.VarChar, username)
      .query(
        "update users set (wins) values(@inputparameter1) where username = @inputparameter2"
      );
    console.log("Update Loss", result);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const CreateMatch = async (config: Config, match: Match) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter1", sql.VarChar, match.winner)
      .input("input_parameter2", sql.VarChar, match.loser)
      .input("input_parameter3", sql.Date, match.date)
      .query(
        "insert into matches (winner, loser, date) values(@input_parameter1, @input_parameter2, @input_parameter3)"
      );
    console.log(result);
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  ConnectServer,
  GetUser,
  CreateUser,
  updateAfterLoss,
  updateAfterWin,
  CreateMatch,
};

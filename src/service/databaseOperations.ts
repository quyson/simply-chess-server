import sql from "mssql";
import Config from "../interface/database";
import { Rank, User } from "../models/user";

const ConnectServer = async (config: Config) => {
  try {
    console.log("config", config);
    const result = await sql.connect(config);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const GetUser = async (config: Config, username: string) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("input_parameter", sql.VarChar, username)
      .query("select * from users where username = @input_parameter");
    const user = result.recordset[0];
    console.log("DBUSER", user);
    return user;
  } catch (err) {
    console.log(err);
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

export { ConnectServer, GetUser, CreateUser };

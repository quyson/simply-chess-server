import express from "express";
import morgan from "morgan";
import { SqlClient } from "msnodesqlv8/types";

const app = express();
const sql: SqlClient = require("msnodesqlv8");

app.use(morgan("dev"));

const connectionString =
  "server=.;Database=Master;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "SELECT name FROM sys.databases";

sql.query(connectionString, query, (err, rows) => {
  console.log(rows);
});

import express from "express";
import morgan from "morgan";
import sql from "mssql";
import SqlConfig from "./interface/sqlConfig";
import dotenv from "dotenv";
import "reflect-metadata";

const app = express();
dotenv.config();

const dbUser: string = process.env.DB_USER as string;
const dbPassword: string = process.env.DB_PWD as string;
const dbName: string = process.env.DB_NAME as string;
const serverName: string = process.env.SERVER_NAME as string;

const sqlConfig: SqlConfig = {
  user: dbUser,
  password: dbPassword,
  database: dbName,
  server: serverName,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

/*async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from mytable where id = ${value}`;
    console.dir(result);
  } catch (err) {
    // ... error checks
  }
};*/

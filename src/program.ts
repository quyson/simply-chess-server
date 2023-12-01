import express from "express";
import morgan from "morgan";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";

const app = express();
dotenv.config();

const dbUser: string = process.env.DB_USER as string;
const dbPassword: undefined = process.env.DB_PWD as undefined;
const dbName: string = process.env.DB_NAME as string;
const serverName: string = process.env.SERVER_NAME as string;

const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 3306,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  entities: ["UserEntity", "MatchEntity"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;
app.listen(8000);
app.use(morgan("dev"));

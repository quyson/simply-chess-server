import { DataSource } from "typeorm";
import dotenv from "dotenv";
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

export default AppDataSource;

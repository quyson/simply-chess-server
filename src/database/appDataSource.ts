import { DataSource } from "typeorm";
import { UserEntity } from "../entity/userEntity";
import { MatchEntity } from "../entity/matchEntity";
import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

const dbUser: string = process.env.DB_USER as string;
const dbName: string = process.env.DB_NAME as string;
const dbPass: string = process.env.DB_PWD as string;
const serverName: string = process.env.SERVER_NAME as string;

const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: dbUser,
  password: dbPass,
  database: dbName,
  entities: [UserEntity, MatchEntity],
  synchronize: true,
  extra: {
    options: {
      trustedConnection: true,
      validateConnection: false,
      trustServerCertificate: true,
      instanceof: "SQLEXPRESS",
    },
  },
});

export default AppDataSource;

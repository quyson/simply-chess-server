import Config from "../interface/database";
import dotenv from "dotenv";
dotenv.config();

const sqlConfig: Config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  server: process.env.SERVER_NAME as string,
  database: process.env.DB_NAME as string,
  port: 1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    instancename: "SQLEXPRESS",
  },
};

export default sqlConfig;

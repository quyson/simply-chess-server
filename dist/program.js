"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PWD;
const dbName = process.env.DB_NAME;
const serverName = process.env.SERVER_NAME;
const sqlConfig = {
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

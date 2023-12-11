"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PWD;
const dbName = process.env.DB_NAME;
const serverName = process.env.SERVER_NAME;
const AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 3306,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    entities: ["UserEntity", "MatchEntity"],
});
exports.default = AppDataSource;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const userEntity_1 = require("../entity/userEntity");
const matchEntity_1 = require("../entity/matchEntity");
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
dotenv_1.default.config();
const dbUser = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PWD;
const serverName = process.env.SERVER_NAME;
const AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: dbUser,
    password: dbPass,
    database: dbName,
    entities: [userEntity_1.UserEntity, matchEntity_1.MatchEntity],
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
exports.default = AppDataSource;

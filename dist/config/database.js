"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.SERVER_NAME,
    database: process.env.DB_NAME,
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
exports.default = sqlConfig;

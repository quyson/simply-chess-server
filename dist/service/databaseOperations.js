"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMatch = exports.updateAfterWin = exports.updateAfterLoss = exports.CreateUser = exports.GetUser = exports.ConnectServer = void 0;
const mssql_1 = __importDefault(require("mssql"));
const ConnectServer = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mssql_1.default.connect(config);
        return result;
    }
    catch (err) {
        console.log("config error", err);
    }
});
exports.ConnectServer = ConnectServer;
const GetUser = (config, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config);
        let result = yield pool
            .request()
            .input("input_parameter", mssql_1.default.VarChar, username)
            .query("select * from users where username = @input_parameter");
        const user = result.recordset[0];
        console.log("DBUSER", user);
        return user;
    }
    catch (err) {
        console.log(err);
    }
});
exports.GetUser = GetUser;
const CreateUser = (config, username, password, elo, wins, losses, rank) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config);
        let result = yield pool
            .request()
            .input("input_parameter1", mssql_1.default.VarChar, username)
            .input("input_parameter2", mssql_1.default.VarChar, password)
            .input("input_parameter3", mssql_1.default.Int, elo)
            .input("input_parameter4", mssql_1.default.Int, wins)
            .input("input_parameter5", mssql_1.default.Int, losses)
            .input("input_parameter6", mssql_1.default.VarChar, rank)
            .query("insert into users (username, password, elo, wins, losses, rank) values(@input_parameter1, @input_parameter2, @input_parameter3, @input_parameter4, @input_parameter5, @input_parameter6)");
        console.log(result);
        return true;
    }
    catch (err) {
        console.log(err);
    }
});
exports.CreateUser = CreateUser;
const updateAfterWin = (config, username, updatedWins) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config);
        let result = yield pool
            .request()
            .input("inputparameter1", mssql_1.default.Int, updatedWins)
            .input("inputparameter2", mssql_1.default.VarChar, username)
            .query("update users set (wins) values(@inputparameter1) where username = @inputparameter2");
        console.log("Update Win", result);
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateAfterWin = updateAfterWin;
const updateAfterLoss = (config, username, updatedLosses) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config);
        let result = yield pool
            .request()
            .input("inputparameter1", mssql_1.default.Int, updatedLosses)
            .input("inputparameter2", mssql_1.default.VarChar, username)
            .query("update users set (wins) values(@inputparameter1) where username = @inputparameter2");
        console.log("Update Loss", result);
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateAfterLoss = updateAfterLoss;
const CreateMatch = (config, match) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config);
        let result = yield pool
            .request()
            .input("input_parameter1", mssql_1.default.VarChar, match.winner)
            .input("input_parameter2", mssql_1.default.VarChar, match.loser)
            .input("input_parameter3", mssql_1.default.Date, match.date)
            .query("insert into matches (winner, loser, date) values(@input_parameter1, @input_parameter2, @input_parameter3)");
        console.log(result);
        return true;
    }
    catch (err) {
        console.log(err);
    }
});
exports.CreateMatch = CreateMatch;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Match {
    constructor(winner, loser) {
        this.winner = winner;
        this.loser = loser;
        this.date = Date.now();
    }
}
exports.default = Match;

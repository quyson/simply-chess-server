"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.elo = 0;
        this.wins = 0;
        this.losses = 0;
        this.rank = "Iron";
    }
    getID() {
        return this.ID;
    }
    getName() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getElo() {
        return this.elo;
    }
    getWins() {
        return this.wins;
    }
    getLosses() {
        return this.losses;
    }
    getRank() {
        return this.rank;
    }
    setRank() {
        const elo = this.getElo();
        if (elo <= 5) {
            this.rank = "Wood";
        }
        if (elo <= 10) {
            this.rank = "Iron";
        }
        if (elo <= 20) {
            this.rank = "Bronze";
        }
        if (elo <= 30) {
            this.rank = "Silver";
        }
        if (elo <= 40) {
            this.rank = "Gold";
        }
        if (elo <= 50) {
            this.rank = "Platinum";
        }
        if (elo <= 60) {
            this.rank = "Ruby";
        }
        if (elo <= 70) {
            this.rank = "Sapphire";
        }
        if (elo <= 80) {
            this.rank = "Emerald";
        }
        if (elo <= 90) {
            this.rank = "Pearl";
        }
        else {
            this.rank = "Diamond";
        }
    }
    setElo() {
        this.elo = this.getWins() - this.getLosses();
    }
    setWins() {
        this.wins += 1;
    }
    setLosses() {
        this.losses += 1;
    }
}
exports.User = User;

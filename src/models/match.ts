import { User } from "./user";

class Match {
  readonly winner: string;
  readonly loser: string;
  readonly date: number;

  public constructor(winner: string, loser: string) {
    this.winner = winner;
    this.loser = loser;
    this.date = Date.now();
  }
}

export default Match;

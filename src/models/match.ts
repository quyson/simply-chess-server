import User from "./user";

class Match {
  private readonly winner: User;
  private readonly loser: User;
  private readonly date: number;

  public constructor(winner: User, loser: User) {
    this.winner = winner;
    this.loser = loser;
    this.date = Date.now();
  }
}

export default Match;

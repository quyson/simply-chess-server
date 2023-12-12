type Rank =
  | "Wood"
  | "Iron"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Ruby"
  | "Sapphire"
  | "Emerald"
  | "Pearl"
  | "Diamond";

class User {
  private readonly username: string;
  private readonly password: string;
  private elo: number;
  private wins: number;
  private losses: number;
  private rank: Rank;

  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.elo = 0;
    this.wins = 0;
    this.losses = 0;
    this.rank = "Iron";
  }

  public getName(): string {
    return this.username;
  }

  public getElo(): number {
    return this.elo;
  }

  public getWins(): number {
    return this.wins;
  }

  public getLosses(): number {
    return this.losses;
  }

  public getRank(): Rank {
    return this.rank;
  }

  public setRank(): void {
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
    } else {
      this.rank = "Diamond";
    }
  }

  public setElo(): void {
    this.elo = this.getWins() - this.getLosses();
  }

  public setWins(): void {
    this.wins += 1;
  }

  public setLosses(): void {
    this.losses += 1;
  }
}

export default User;

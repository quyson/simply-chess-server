type Rank =
  | "Wood"
  | "Iron"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Ruby"
  | "Saphire"
  | "Emerald"
  | "Pearl"
  | "Diamond";

interface User {
  username: string;
  password: string;
  elo: number;
  rank: Rank;
}

export default User;

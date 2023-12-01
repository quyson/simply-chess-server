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

interface User {
  id: number;
  username: string;
  password: string;
  elo: number;
  rank: Rank;
}

export default User;

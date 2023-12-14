import { Rank } from "../models/user";

interface dbUser {
  id?: number;
  username: string;
  password: string;
  elo: number;
  wins: number;
  losses: number;
  rank: Rank;
}

export default dbUser;

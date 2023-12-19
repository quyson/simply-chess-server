import { PieceSymbol } from "chess.js";

interface Move {
  from: string;
  to: string;
  promotion?: PieceSymbol | undefined;
}

export default Move;

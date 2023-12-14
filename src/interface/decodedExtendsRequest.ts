import { Request } from "express";

interface Decoded extends Request {
  username?: string;
  password?: string;
  iat?: number;
  exp?: number;
}

export default Decoded;

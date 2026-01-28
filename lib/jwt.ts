import { JwtPayload } from "@Types/jwt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function getTokenData(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
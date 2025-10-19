import { parseJwt } from "./parse-jwt.utility";

export function isTokenExpired(token: string): boolean {
  const decoded = parseJwt(token);
  if (!decoded || typeof decoded !== "object") return true;

  if (!("exp" in decoded)) return true;

  const now = Date.now() / 1000;

  return typeof decoded.exp !== "number" || decoded.exp < now;
}

import jwt from "jsonwebtoken";

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) return true;

    if (typeof decoded === "string") return true;

    if (!("exp" in decoded)) return true;

    const now = Date.now() / 1000;

    if (typeof decoded.exp !== "number") return true;

    return decoded.exp < now;
  } catch {
    return true;
  }
}

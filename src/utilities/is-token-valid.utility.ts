import { jwtDecode } from "jwt-decode";

export function isTokenValid(token: string): boolean {
  try {
    const decoded: { exp?: number } = jwtDecode(token);

    if (!decoded.exp) return true;

    const now = Date.now() / 1000;

    return decoded.exp > now;
  } catch {
    return true;
  }
}

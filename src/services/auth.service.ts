import type { User } from "@prisma/client";
import { BASE_URL } from "../configuration/public-env.configuration";
import type { SanitizedUser } from "../models/sanitized-user.model";

export class AuthService {
  private static API_BASE = `${BASE_URL}/api/auth`;

  static async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ user: SanitizedUser; token: string }> {
    const res = await fetch(`${this.API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al registrarse");
    }

    const response = await res.json();

    return response.value;
  }

  static async login(data: {
    email: string;
    password: string;
  }): Promise<{ user: SanitizedUser; token: string }> {
    const res = await fetch(`${this.API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al loguearse");
    }

    const response = await res.json();

    return response.value;
  }
}

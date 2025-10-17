import type { User } from "@prisma/client";
import { BASE_URL } from "../configuration/env.configuration";

export class AuthService {
  private static API_BASE = `${BASE_URL}/api/auth`;

  static async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
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

    return res.json();
  }

  static async login(data: { email: string; password: string }) {
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

    return res.json();
  }

  static async getProfile(): Promise<{ user: User }> {
    const session = JSON.parse(localStorage.getItem("session") || "{}");

    const res = await fetch(`${this.API_BASE}/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al loguearse");
    }

    return await res.json();
  }
}

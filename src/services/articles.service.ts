import type { Article } from "@prisma/client";
import { BASE_URL } from "../configuration/env.configuration";

export class ArticlesService {
  private static API_BASE = `${BASE_URL}/api/articles`;

  static async create(data: {
    title: string;
    subtitle: string;
    description: string;
    content: string;
    author: string;
    thumbnail: { url: string; alt: string };
  }): Promise<Article> {
    const session = JSON.parse(localStorage.getItem("session") || "{}");

    const res = await fetch(this.API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },

      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al crear el artículo");
    }

    return res.json();
  }

  static async getById(id: string): Promise<Article | undefined> {
    const res = await fetch(`${this.API_BASE}/${id}`);
    if (!res.ok) return undefined;
    return res.json();
  }

  static async getMostRecent(amount: number = 4): Promise<Article[]> {
    const res = await fetch(`${this.API_BASE}?amount=${amount}`);
    if (!res.ok) return [];
    return res.json();
  }

  static async getMostPopular(): Promise<Article[]> {
    const res = await fetch(`${this.API_BASE}`);
    if (!res.ok) return [];
    return res.json();
  }
}

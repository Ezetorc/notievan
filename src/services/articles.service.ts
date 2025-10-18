import type { Article } from "@prisma/client";
import { BASE_URL } from "../configuration/public-env.configuration";
import { SessionService } from "./session.service";

export class ArticlesService {
  private static API_BASE = `${BASE_URL}/api/articles`;

  static async create(data: FormData): Promise<Article> {
    const token = SessionService.token;

    const res = await fetch(this.API_BASE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error al crear el artículo");
    }

    const response = await res.json();

    return response.value;
  }

  static async getById(id: string): Promise<Article | undefined> {
    const res = await fetch(`${this.API_BASE}/${id}`);

    if (!res.ok) return undefined;

    const data = await res.json();

    return data.value;
  }

  static async getAll(amount: number = 4): Promise<Article[]> {
    const res = await fetch(`${this.API_BASE}?amount=${amount}`);

    console.log("response: ", res);
    console.log("success: ", res.ok);

    if (!res.ok) return [];
    const data = await res.json();

    return data.value;
  }
}

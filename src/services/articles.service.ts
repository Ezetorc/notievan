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

  static async getAll(
    {
      page = 0,
      limit = 4,
    }: {
      page: number;
      limit: number;
    } = { page: 0, limit: 4 }
  ): Promise<Article[]> {
    const res = await fetch(`${this.API_BASE}?page=${page}&limit=${limit}`);

    if (!res.ok) return [];

    const data = await res.json();

    return data.value.data as Article[];
  }

  static async getOwn(
    {
      page = 0,
      limit = 4,
    }: {
      page: number;
      limit: number;
    } = { page: 0, limit: 4 }
  ): Promise<Article[]> {
    const token = SessionService.token;
    const res = await fetch(
      `${this.API_BASE}/own?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.value.data as Article[];
  }

  static async getRandom(omitId: string): Promise<Article[]> {
    const res = await fetch(`${this.API_BASE}/random?omit=${omitId}`);

    if (!res.ok) return [];

    const data = await res.json();

    return data.value;
  }
}

import axios from "axios";
import type { Article } from "@prisma/client";
import { SessionService } from "./session.service";
import { publicEnv } from "../configuration/public-env.configuration";

export class ArticlesService {
  private static API_BASE = `${publicEnv.baseUrl}/api/articles`;

  static async create(data: FormData): Promise<Article> {
    try {
      const token = SessionService.token;
      const response = await axios.post<{ value: Article }>(this.API_BASE, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.value;
    } catch (error: any) {
      const message = error.response?.data?.error || "Error al crear el artículo";

      throw new Error(message);
    }
  }

  static async update(data: FormData, id: string): Promise<Article> {
    try {
      const token = SessionService.token;

      const response = await axios.patch<{ value: Article }>(`${this.API_BASE}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.value;
    } catch (error: any) {
      const message = error.response?.data?.error || "Error al editar el artículo";

      throw new Error(message);
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const token = SessionService.token;

      await axios.delete(`${this.API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  static async getById(id: string): Promise<Article | undefined> {
    try {
      const response = await axios.get<{ value: Article }>(`${this.API_BASE}/${id}`);

      return response.data.value;
    } catch {
      return undefined;
    }
  }

  static async getAll(
    {
      page = 0,
      limit = 4,
    }: {
      page?: number;
      limit?: number;
    } = {}
  ): Promise<Article[]> {
    try {
      const response = await axios.get<{ value: { data: Article[] } }>(
        `${this.API_BASE}?page=${page}&limit=${limit}`
      );

      return response.data.value.data;
    } catch {
      return [];
    }
  }

  static async getOwn(
    {
      page = 0,
      limit = 4,
    }: {
      page?: number;
      limit?: number;
    } = {}
  ): Promise<Article[]> {
    try {
      const token = SessionService.token;

      const response = await axios.get<{ value: { data: Article[] } }>(
        `${this.API_BASE}/own?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.value.data;
    } catch {
      return [];
    }
  }

  static async getRandom(omitId: string): Promise<Article[]> {
    try {
      const response = await axios.get<{ value: Article[] }>(
        `${this.API_BASE}/random?omit=${omitId}`
      );

      return response.data.value;
    } catch {
      return [];
    }
  }
}

import { publicEnv } from "../configuration/public-env.configuration";

export class UsersService {
  private static API_BASE = `${publicEnv.baseUrl}/api/users`;

  static async getNameOfUserWithId(id?: string): Promise<string> {
    if (!id) return "";

    const res = await fetch(`${this.API_BASE}/${id}/name`);

    if (!res.ok) return "";

    const data = await res.json();

    return data.value;
  }
}

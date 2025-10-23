import axios from "axios";
import { publicEnv } from "../configuration/public-env.configuration";

export class UsersService {
  private static API_BASE = `${publicEnv.baseUrl}/api/users`;

  static async getNameOfUser(id?: string): Promise<string> {
    try {
      if (!id) return "";
      
      const response = await axios.get<{ value: string }>(`${this.API_BASE}/${id}/name`)

      return response.data.value;
    } catch (error: any) {
      const message = error.response?.data?.error || "Error obteniendo nombre de usuario";

      throw new Error(message);
    }
  }
}

import axios from "axios";
import { publicEnv } from "../configuration/public-env.configuration";
import type { AuthResponse } from "../models/auth-response.model";
import type { RegisterDtoType } from "../models/dtos/register.dto";
import type { LoginDtoType } from "../models/dtos/login.dto";

export class AuthService {
  private static API_BASE = `${publicEnv.baseUrl}/api/auth`;

  static async register(data: RegisterDtoType) {
    try {
      const response = await axios.post<{ value: AuthResponse }>(`${this.API_BASE}/register`, data);

      return response.data.value;
    } catch (error: any) {
      const message = error.response?.data?.error || "Error al registrarse";

      throw new Error(message);
    }
  }

  static async login(data: LoginDtoType) {
    try {
      const response = await axios.post<{ value: AuthResponse }>(`${this.API_BASE}/login`, data);

      return response.data.value;
    } catch (error: any) {
      const message = error.response?.data?.error || "Error al loguearse";

      throw new Error(message);
    }
  }
}

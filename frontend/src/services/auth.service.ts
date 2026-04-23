import type { AuthResponse } from '../models/auth-response.model'
import type { SignUpFormData } from '../pages/SignUp/models/sign-up-form-data.model'
import type { SignInFormData } from '../pages/SignIn/models/sign-in-form-data.model'
import { HttpClient } from '../models/http-client.model'

export class AuthService {
	private static readonly API_BASE = '/auth'

	static async register(data: SignUpFormData): Promise<AuthResponse> {
		const response = await HttpClient.post<AuthResponse>(
			`${AuthService.API_BASE}/register`,
			data
		)

		if (response.error || !response.data) throw new Error(response.error)
		return response.data
	}

	static async login(data: SignInFormData): Promise<AuthResponse> {
		const response = await HttpClient.post<AuthResponse>(
			`${AuthService.API_BASE}/login`,
			data
		)

		if (response.error || !response.data)
			throw new Error(response.error || 'Error al iniciar sesión')
		return response.data
	}
}

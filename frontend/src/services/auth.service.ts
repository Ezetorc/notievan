import type { AuthResponse } from '../models/auth-response.model'
import type { SignInDtoType } from '../../../shared/src/dtos/in/sign-in.dto'
import type { SignUpDtoType } from '../../../shared/src/dtos/in/sign-up.dto'

import { HttpClient } from '../models/http-client.model'

export class AuthService {
	private static readonly API_BASE = '/auth'

	static async register(data: SignUpDtoType): Promise<AuthResponse> {
		const response = await HttpClient.post<AuthResponse>(
			`${AuthService.API_BASE}/sign-up`,
			data
		)

		if (response.error || !response.data) throw new Error(response.error)
		return response.data
	}

	static async login(data: SignInDtoType): Promise<AuthResponse> {
		const response = await HttpClient.post<AuthResponse>(
			`${AuthService.API_BASE}/sign-in`,
			data
		)

		if (response.error || !response.data)
			throw new Error(response.error || 'Error al iniciar sesión')
		return response.data
	}
}

import type { SignInDtoType } from '../../../shared/src/dtos/in/sign-in.dto'
import type { SignUpDtoType } from '../../../shared/src/dtos/in/sign-up.dto'
import type { UserOut } from '../../../shared/src/dtos/out/user-out.dto'
import { HttpClient } from '../models/http-client.model'

export class AuthService {
	private static readonly BASE = '/auth'

	static signUp(
		data: SignUpDtoType
	): Promise<{ user: UserOut; token: string }> {
		return HttpClient.post<{ user: UserOut; token: string }>(
			`${AuthService.BASE}/sign-up`,
			data
		)
	}

	static signIn(
		data: SignInDtoType
	): Promise<{ user: UserOut; token: string }> {
		return HttpClient.post<{ user: UserOut; token: string }>(
			`${AuthService.BASE}/sign-in`,
			data
		)
	}
}

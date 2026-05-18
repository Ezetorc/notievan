import { SignInDto } from 'shared/dtos/in/sign-in.dto'
import type { UserOut } from 'shared/dtos/out/user-out.dto'
import { COOKIES } from '$lib/configuration/cookies.configuration'
import { ServerApiService } from '$lib/services/server-api.service'
import { parseFormError } from '$lib/utilities/parse-form-error.utility'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()

		try {
			const result = SignInDto.parse(Object.fromEntries(data))

			const response = await ServerApiService.post<{
				user: UserOut
				token: string
			}>({
				url: `/auth/sign-in`,
				body: result
			})

			cookies.set(
				COOKIES.AccessToken.name,
				response.token,
				COOKIES.AccessToken.options
			)

			return true
		} catch (error) {
			console.error('[SignIn] ', error)

			return parseFormError(error)
		}
	}
}

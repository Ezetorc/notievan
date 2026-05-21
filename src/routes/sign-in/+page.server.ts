import { AuthService } from 'auth/server/services/auth.service'
import { parseFormError } from 'server/utilities/parse-form-error.utility'
import type { Actions } from './$types'
import { SignInSchema } from 'auth/schemas/sign-in.schema'
import { COOKIES } from 'server/configuration/cookies.configuration'

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()

		try {
			const { email, password } = SignInSchema.parse(Object.fromEntries(data))
			const { token } = await AuthService.signIn(email, password)

			cookies.set(COOKIES.AccessToken.name, token, COOKIES.AccessToken.options)

			return true
		} catch (error) {
			console.error('[SignIn] ', error)

			return parseFormError(error)
		}
	}
}

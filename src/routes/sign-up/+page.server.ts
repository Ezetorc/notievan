import { SignUpSchema } from 'auth/schemas/sign-up.schema'
import type { Actions } from './$types'
import { AuthService } from 'auth/server/services/auth.service'
import { COOKIES } from 'server/configuration/cookies.configuration'
import { parseFormError } from 'server/utilities/parse-form-error.utility'

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()

		try {
			const { name, email, password } = SignUpSchema.parse(
				Object.fromEntries(data)
			)

			const { token } = await AuthService.signUp(name, email, password)

			cookies.set(COOKIES.AccessToken.name, token, COOKIES.AccessToken.options)

			return true
		} catch (error) {
			console.error('[SignUp] ', error)

			return parseFormError(error)
		}
	}
}

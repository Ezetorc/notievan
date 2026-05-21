import { JwtService } from 'auth/server/services/jwt.service'
import { COOKIES } from 'server/configuration/cookies.configuration'
import { UsersService } from 'users/server/services/users.service'

export async function handle({ event, resolve }) {
	event.locals.user = null

	const token = event.cookies.get(COOKIES.AccessToken.name)

	if (token) {
		try {
			const payload = JwtService.validate(token)

			if (payload.sub) {
				const user = await UsersService.getById(payload.sub)

				event.locals.user = user
			}
		} catch {
			event.cookies.delete(COOKIES.AccessToken.name, {
				path: '/'
			})
		}
	}

	return resolve(event)
}

import type { SerializeOptions } from 'cookie'

type CookieId = 'AccessToken'

export const COOKIES: {
	[key in CookieId]: {
		name: string
		options: SerializeOptions & { path: string }
	}
} = {
	AccessToken: {
		name: 'access_token',
		options: {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		}
	}
}

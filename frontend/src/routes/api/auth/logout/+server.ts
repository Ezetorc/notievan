import { COOKIES } from '$lib/configuration/cookies.configuration.js'

export async function POST({ cookies }) {
	cookies.delete(COOKIES.AccessToken.name, {
		path: '/'
	})

	return Response.json(true)
}

import { COOKIES } from 'server/configuration/cookies.configuration'

export async function POST({ cookies }) {
	cookies.delete(COOKIES.AccessToken.name, {
		path: '/'
	})

	return Response.json(true)
}

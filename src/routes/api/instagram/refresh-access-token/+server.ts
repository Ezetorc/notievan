import { InstagramService } from 'server/services/instagram.service'
import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'

export const GET = endpoint(async ({ locals }) => {
	requireRole(locals.user, ['ADMIN'])

	await InstagramService.refreshAccessToken()

	return Response.json(true, { status: 200 })
})

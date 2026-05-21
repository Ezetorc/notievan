import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'
import { UserOut } from 'users/models/user-out.dto'
import { UsersService } from 'users/server/services/users.service'

export const GET = endpoint(async ({ locals }) => {
	requireRole(locals.user)

	const user = await UsersService.getById(locals.user.id)
	const userOut = UserOut.from(user)

	return Response.json(userOut)
})

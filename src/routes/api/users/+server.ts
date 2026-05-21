import { PaginationParamsSchema } from 'server/schemas/pagination-params.schema'
import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'
import { UserOut } from 'users/models/user-out.dto'
import { UsersService } from 'users/server/services/users.service'

export const GET = endpoint(async ({ locals, url }) => {
	requireRole(locals.user, ['ADMIN'])

	const { limit, cursor } = PaginationParamsSchema.parse(
		Object.fromEntries(url.searchParams)
	)
	const result = await UsersService.getAll({
		limit,
		cursor
	})

	return Response.json({
		data: result.data
			.filter((user) => user.id !== locals.user.id)
			.map((user) => UserOut.from(user)),
		nextCursor: result.nextCursor
	})
})

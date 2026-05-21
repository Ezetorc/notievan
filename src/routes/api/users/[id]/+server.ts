import { error } from '@sveltejs/kit'
import { CUIDParamSchema } from 'server/schemas/cuid-param.schema'
import { endpoint } from 'server/utilities/endpoint.utility'
import { ErrorCode } from 'shared/models/error-code.model'
import { UserOut } from 'users/models/user-out.dto'
import { UpdateUserSchema } from 'users/schemas/update-user.schema'
import { UsersService } from 'users/server/services/users.service'

export const PATCH = endpoint(async ({ params, request, locals }) => {
	const body = await request.json()
	const { id } = CUIDParamSchema.parse(params)

	if (locals.user.id !== id && locals.user.role !== 'ADMIN') {
		throw error(403, ErrorCode.FORBIDDEN)
	}

	const data = UpdateUserSchema.parse(body)
	const user = await UsersService.update(id, data, locals.user.role)
	const userOut = UserOut.from(user)

	return Response.json(userOut)
})

export const GET = endpoint(async ({ params, locals }) => {
	const { id } = CUIDParamSchema.parse(params)

	if (locals.user.id !== id) {
		throw error(403, ErrorCode.FORBIDDEN)
	}

	const user = await UsersService.getById(id)
	const userOut = UserOut.from(user)

	return Response.json(userOut)
})

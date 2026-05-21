import { CommentsService } from 'comments/server/services/comments.service'
import { CUIDParamSchema } from 'server/schemas/cuid-param.schema'
import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'

export const DELETE = endpoint(async ({ locals, params }) => {
	requireRole(locals.user)

	const userId = locals.user.id
	const { id } = CUIDParamSchema.parse(params)
	const success = await CommentsService.delete(id, userId)

	return Response.json(success)
})

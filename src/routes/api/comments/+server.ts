import { CommentOut } from 'comments/models/comment-out.dto'
import { CreateCommentSchema } from 'comments/schemas/create-comment.schema'
import { CommentsService } from 'comments/server/services/comments.service'
import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'

export const POST = endpoint(async ({ locals, request }) => {
	requireRole(locals.user)

	const body = await request.json()
	const { content, articleId } = CreateCommentSchema.parse(body)
	const comment = await CommentsService.create(
		content,
		articleId,
		locals.user.id
	)
	const commentOut = CommentOut.from(comment)

	return Response.json(commentOut, { status: 201 })
})

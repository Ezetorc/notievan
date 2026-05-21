import { ArticleOut } from 'articles/models/article-out.model'
import { UpdateArticleSchema } from 'articles/schemas/update-article.schema'
import { ArticlesService } from 'articles/server/services/articles.service'
import { CUIDParamSchema } from 'server/schemas/cuid-param.schema'
import { endpoint } from 'server/utilities/endpoint.utility'
import { requireRole } from 'server/utilities/require-role.utility'
import { ARTICLE_WRITER_ROLES } from 'shared/configuration/article-writer-roles.configuration'

export const GET = endpoint(async ({ params }) => {
	const { id } = CUIDParamSchema.parse(params)
	const article = await ArticlesService.getById(id)
	const articleOut = ArticleOut.from(article)

	return Response.json(articleOut)
})

export const DELETE = endpoint(async ({ params, locals }) => {
	requireRole(locals.user, ARTICLE_WRITER_ROLES)

	const { id } = CUIDParamSchema.parse(params)
	const success = await ArticlesService.delete(id, locals.user.id)

	return Response.json(success)
})

export const PATCH = endpoint(async ({ locals, params, request }) => {
	requireRole(locals.user, ARTICLE_WRITER_ROLES)

	const { id } = CUIDParamSchema.parse(params)
	const formData = await request.formData()
	const data = UpdateArticleSchema.parse(Object.entries(formData))
	const success = await ArticlesService.update(id, data, locals.user.id)

	return Response.json(success)
})

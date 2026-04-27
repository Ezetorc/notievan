import type { Prisma } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration.js'

export class CommentsRepository {
	static async create(data: Prisma.CommentUncheckedCreateInput) {
		return await prisma.comment.create({ data })
	}

	static async getAllOfArticle(articleId: string, limit: number, skip: number) {
		return await prisma.comment.findMany({
			where: { articleId },
			orderBy: { createdAt: 'desc' },
			take: limit,
			skip
		})
	}

	static async findById(id: string) {
		return await prisma.comment.findUnique({ where: { id } })
	}

	static async delete(id: string) {
		const comment = await prisma.comment.delete({ where: { id } })

		return Boolean(comment)
	}
}

import { prisma } from '../configuration/prisma.configuration.js'
import type { Prisma } from '../../prisma/generated/prisma/index.js'

export class ArticlesRepository {
	static async findById(id: string) {
		return await prisma.article.findUnique({ where: { id } })
	}

	static async delete(id: string) {
		return await prisma.article.delete({ where: { id } })
	}

	static async create(data: Prisma.ArticleUncheckedCreateInput) {
		return await prisma.article.create({ data })
	}

	static async update(id: string, data: Prisma.ArticleUpdateInput) {
		return await prisma.article.update({ where: { id }, data })
	}

	static async getAll(limit: number, skip: number) {
		return await prisma.article.findMany({
			orderBy: { createdAt: 'desc' },
			select: {
				authorId: true,
				content: false,
				createdAt: true,
				description: true,
				id: true,
				subtitle: true,
				image: true,
				title: true
			},
			take: limit,
			skip
		})
	}

	static async getOwn(limit: number, skip: number, userId: string) {
		return await prisma.article.findMany({
			where: { authorId: userId },
			orderBy: { createdAt: 'desc' },
			select: {
				authorId: true,
				content: false,
				createdAt: true,
				description: true,
				id: true,
				subtitle: true,
				image: true,
				title: true
			},
			take: limit,
			skip
		})
	}

	static async getRandomIds(limit: number, omit: string) {
		return await prisma.article.findMany({
			where: omit ? { id: { not: omit } } : {},
			select: { id: true },
			take: limit
		})
	}

	static async getByIds(ids: string[]) {
		return await prisma.article.findMany({
			where: { id: { in: ids } }
		})
	}
}

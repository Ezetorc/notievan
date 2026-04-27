import type { Prisma, Role } from '@prisma/client'
import { prisma } from '../configuration/prisma.configuration.js'

export class UsersRepository {
	static async create(data: Prisma.UserCreateInput) {
		return await prisma.user.create({ data })
	}

	static async findByName(name: string) {
		return await prisma.user.findUnique({ where: { name } })
	}

	static async findById(id: string) {
		return await prisma.user.findUnique({ where: { id } })
	}

	static async findByEmail(email: string) {
		return await prisma.user.findUnique({ where: { email } })
	}

	static async findAll(limit: number, skip: number) {
		return await prisma.user.findMany({
			orderBy: { createdAt: 'desc' },
			take: limit,
			skip
		})
	}

	static async updateRole(id: string, role: Role) {
		return await prisma.user.update({
			where: { id },
			data: { role }
		})
	}

	static async update(id: string, data: Prisma.UserUpdateInput) {
		return await prisma.user.update({
			where: { id },
			data
		})
	}

	static async findNameById(id: string) {
		const user = await prisma.user.findUnique({
			where: { id },
			select: { name: true }
		})

		return user?.name
	}
}

import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import { database } from '../configuration/database.configuration.js'
import { users } from '../database/schema.js'
import { eq, desc } from 'drizzle-orm'

export class UsersRepository {
	static async create(data: {
		name: string
		email: string
		password: string
		role?: UserRole
	}) {
		const result = await database.insert(users).values(data).returning()

		return result[0]
	}

	static async findAuthUserById(id: string) {
		const result = await database
			.select({
				id: users.id,
				role: users.role
			})
			.from(users)
			.where(eq(users.id, id))
			.limit(1)

		return result[0] ?? null
	}

	static async findByName(name: string) {
		const result = await database
			.select()
			.from(users)
			.where(eq(users.name, name))
			.limit(1)

		return result[0] ?? null
	}

	static async findById(id: string) {
		const result = await database
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1)

		return result[0] ?? null
	}

	static async findByEmail(email: string) {
		const result = await database
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1)

		return result[0] ?? null
	}

	static async findAll(limit: number, skip: number) {
		return await database
			.select()
			.from(users)
			.orderBy(desc(users.createdAt))
			.limit(limit)
			.offset(skip)
	}

	static async updateRole(id: string, role: UserRole) {
		const result = await database
			.update(users)
			.set({ role })
			.where(eq(users.id, id))
			.returning()

		return result[0] ?? null
	}

	static async update(
		id: string,
		data: Partial<{
			name: string
			email: string
			password: string
			role: UserRole
		}>
	) {
		const result = await database
			.update(users)
			.set(data)
			.where(eq(users.id, id))
			.returning()

		return result[0] ?? null
	}

	static async findNameById(id: string) {
		const result = await database
			.select({ name: users.name })
			.from(users)
			.where(eq(users.id, id))
			.limit(1)

		return result[0]?.name ?? null
	}
}

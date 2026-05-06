import type { UserRole } from '../../../shared/src/models/user-role.model.js'
import { database } from '../database/database.configuration.js'
import { eq, desc, and, lt, or } from 'drizzle-orm'
import { users } from '../database/schema/users.schema.js'
import type { Cursor } from '../../../shared/src/models/cursor.model.js'
import type { User } from '../../../shared/src/models/user.model.js'
import type { JWTUser } from '../auth/jwt-user.model.js'

export class UsersRepository {
	static async create(data: {
		name: string
		email: string
		password: string
		role?: UserRole
	}): Promise<User | null> {
		const result = await database.insert(users).values(data).returning()

		return result[0]
	}

	static async findAuthUserById(id: string): Promise<JWTUser | null> {
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

	static async findByName(name: string): Promise<User | null> {
		const result = await database
			.select()
			.from(users)
			.where(eq(users.name, name))
			.limit(1)

		return result[0] ?? null
	}

	static async findById(id: string): Promise<User | null> {
		const result = await database
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1)

		return result[0] ?? null
	}

	static async findByEmail(email: string): Promise<User | null> {
		const result = await database
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1)

		return result[0] ?? null
	}

	static async findAll(limit: number, cursor?: Cursor): Promise<User[]> {
		return await database
			.select()
			.from(users)
			.where(
				cursor
					? or(
							lt(users.createdAt, new Date(cursor.createdAt)),
							and(
								eq(users.createdAt, new Date(cursor.createdAt)),
								lt(users.id, cursor.id)
							)
						)
					: undefined
			)
			.orderBy(desc(users.createdAt), desc(users.id))
			.limit(limit)
	}

	static async updateRole(id: string, role: UserRole): Promise<User | null> {
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
	): Promise<User | null> {
		const result = await database
			.update(users)
			.set(data)
			.where(eq(users.id, id))
			.returning()

		return result[0] ?? null
	}
}

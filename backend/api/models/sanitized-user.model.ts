import type { UserRole, User } from '../database/types.js'

export class SanitizedUser {
	constructor(user: User) {
		this.id = user.id
		this.email = user.email
		this.name = user.name
		this.role = user.role
		this.createdAt = user.createdAt.toISOString()
	}

	id: string
	email: string
	name: string
	role: UserRole
	createdAt: string
}

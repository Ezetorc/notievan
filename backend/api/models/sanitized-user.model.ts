import type { UserRole } from '../../../shared/models/user-role.model.js'
import type { User } from '../../../shared/models/user.model.js'

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

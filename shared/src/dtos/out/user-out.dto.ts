import type { UserRole } from '../../models/user-role.model.js'
import type { User as DatabaseUser } from '../../models/user.model.js'

export class UserOut {
	constructor(user: DatabaseUser) {
		this.id = user.id
		this.name = user.name
		this.role = user.role
		this.createdAt = user.createdAt.toISOString()
	}

	id: string
	name: string
	role: UserRole
	createdAt: string
}

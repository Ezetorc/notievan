import type { User } from 'users/server/models/user.model'
import type { UserRole } from './user-role.model'

export type UserOut = {
	id: string
	name: string
	role: UserRole
	createdAt: string
}

export const UserOut = {
	from(user: User): UserOut {
		return {
			id: user.id,
			name: user.name,
			role: user.role,
			createdAt: user.createdAt.toISOString()
		}
	},

	fromMany(users: User[]): UserOut[] {
		return users.map((user) => this.from(user))
	}
}

import type { UserRole } from 'users/models/user-role.model'

export type JWTUser = {
	id: string
	role: UserRole
}

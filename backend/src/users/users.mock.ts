import type { User } from '../../../shared/src/models/user.model.js'
import { userRoles } from '../../../shared/src/models/user-role.model.js'

export const userMock: User = {
	createdAt: new Date('2024-02-10T08:45:00Z'),
	id: 'ckv9z0u1c0002qzrmn833ijkl',
	name: 'John Carter',
	email: 'john.carter@example.com',
	password: '$2b$10$e0NRo8Fh1n7YxP2Qk5Yj9uQWl9Kz0v6JH3F8sT2mLx9PqR1ZcY8Ga',
	role: userRoles[0]
}

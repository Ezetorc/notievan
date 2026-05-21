import { userRoles } from 'users/models/user-role.model'
import { string, object, enum as zodEnum, type infer as Infer } from 'zod'

export const UpdateUserSchema = object({
	name: string().trim().min(3).max(50).optional(),

	role: zodEnum(userRoles).optional()
})

export type UpdateUserSchema = Infer<typeof UpdateUserSchema>

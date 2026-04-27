import { Role } from '@prisma/client'
import * as z from 'zod'

export const RoleParamDto = z.object({
	role: z.enum(Role)
})

import * as z from 'zod'
import { userRole } from '../../database/schema.js'

export const RoleParamDto = z.object({
	role: z.enum(userRole.enumValues)
})

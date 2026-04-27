import * as z from 'zod'
import { roleEnum } from '../../database/schema.js'

export const RoleParamDto = z.object({
	role: z.enum(roleEnum.enumValues)
})

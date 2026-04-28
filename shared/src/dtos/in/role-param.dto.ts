import * as z from 'zod'
import { userRoles } from "../../models/user-role.model"

export const RoleParamDto = z.object({
	role: z.enum(userRoles)
})

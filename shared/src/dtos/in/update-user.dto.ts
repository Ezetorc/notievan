import { string, object, enum as zodEnum, type infer as Infer } from "zod"
import { userRoles } from '../../models/user-role.model.js'

export const UpdateUserDto = object({
  name: string()
    .trim()
    .min(3)
    .max(50)
    .optional(),

  role: zodEnum(userRoles).optional(),
})

export type UpdateUserDtoType = Infer<typeof UpdateUserDto>

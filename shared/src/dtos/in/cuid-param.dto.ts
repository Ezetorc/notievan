import { string, object } from 'zod'


export const CUIDParamDto = object({
  id: string()
    .trim()
    .regex(/^[a-z0-9]+$/i)
})

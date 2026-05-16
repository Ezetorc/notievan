import { string, object } from 'zod'


export const OmitIdParamDto = object({
  omit: string()
    .trim()
    .regex(/^[a-z0-9]+$/i)
})

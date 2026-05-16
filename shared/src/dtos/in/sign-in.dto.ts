import { string, email, object, type infer as Infer } from 'zod'

export const SignInDto = object({
  email: email()
    .trim()
    .min(6)
    .max(100),
  password: string()
    .trim()
    .min(6)
    .max(30)
})

export type SignInDtoType = Infer<typeof SignInDto>

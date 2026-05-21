import { string, email, object, type infer as Infer } from 'zod'

export const SignInSchema = object({
	email: email().trim().min(6).max(100),
	password: string().trim().min(6).max(30)
})

export type SignInSchema = Infer<typeof SignInSchema>

import { object, email, string, type infer as Infer } from "zod"

export const SignUpDto = object({
  email: email()
    .trim()
    .min(6)
    .max(100),

  password:
    string()
      .trim()
      .min(6)
      .max(30),

  name:
    string()
      .trim()
      .min(3)
      .max(50)
      .transform((name) => name.replace(/\b\w/g, (char) => char.toUpperCase()))
})

export type SignUpDtoType = Infer<typeof SignUpDto>

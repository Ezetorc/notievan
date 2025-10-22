import { z } from "zod";

export const RegisterDto = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
    name: z.string()
});

export type RegisterDtoType = z.infer<typeof RegisterDto>
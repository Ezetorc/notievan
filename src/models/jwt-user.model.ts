import type { Role } from "@prisma/client"

export type JWTUser = {
    id: string
    role: Role
}
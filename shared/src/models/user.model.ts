import type { UserRole } from "./user-role.model"

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: UserRole;
}
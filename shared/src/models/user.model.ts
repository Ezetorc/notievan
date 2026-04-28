import type { UserRole } from "./user-role.model.js";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    role: UserRole;
}
export const userRoles = ["USER", "AUTHOR", "MANAGER", "ADMIN"] as const;
export type UserRole = (typeof userRoles)[number];
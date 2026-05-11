export const userRoles = ["USER", "AUTHOR", "ADMIN"] as const;
export type UserRole = (typeof userRoles)[number];
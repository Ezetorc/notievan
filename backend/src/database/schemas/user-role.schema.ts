import { pgEnum } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('Role', ['USER', 'AUTHOR', 'MANAGER', 'ADMIN'])

import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from './env.configuration.js'

export const database = drizzle(env.databaseUrl)

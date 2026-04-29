import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { env } from './env.configuration.js'

const sql = neon(env.databaseUrl)

export const database = drizzle(sql, {
  logger: true,
})
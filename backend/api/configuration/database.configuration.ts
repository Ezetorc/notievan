import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from './env.configuration.js'

const pool = new Pool({
	connectionString: env.databaseUrl,
	max: 1
})

export const database = drizzle(pool, {
	logger: true
})

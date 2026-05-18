import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '../shared/configuration/env.configuration.js'

const isLocal = env.databaseUrl.includes('localhost')

export const database = isLocal
	? drizzlePg(
			new Pool({
				connectionString: env.databaseUrl
			})
		)
	: drizzleNeon(neon(env.databaseUrl))

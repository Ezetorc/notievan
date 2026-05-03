import { env } from '../configuration/env.configuration.js'
import { Pool } from 'pg'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres'
import { neon } from '@neondatabase/serverless'

const isLocal = env.databaseUrl.includes('localhost')

export const database = isLocal
  ? drizzlePg(
    new Pool({
      connectionString: env.databaseUrl
    })
  )
  : drizzleNeon(neon(env.databaseUrl))
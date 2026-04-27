import { defineConfig } from 'drizzle-kit'
import { env } from './api/configuration/env.configuration.js'

export default defineConfig({
	out: './drizzle',
	schema: './src/database/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.databaseUrl
	}
})

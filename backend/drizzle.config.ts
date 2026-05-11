import { defineConfig } from 'drizzle-kit'
import { env } from './src/shared/configuration/env.configuration'

export default defineConfig({
	schema: './src/database/schemas',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.databaseUrl
	}
})

import { defineConfig, env } from 'prisma/config'
process.loadEnvFile()

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
		seed: 'prisma/seed.js'
	},
	datasource: {
		url: env('DATABASE_URL')
	}
})

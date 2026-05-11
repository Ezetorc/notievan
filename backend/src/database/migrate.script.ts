import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'
import { env } from '../shared/configuration/env.configuration.js'

const client = new Pool({
	connectionString: env.databaseUrl
})

const database = drizzle(client)

async function main() {
	try {
		console.log('Running migrations...')

		await migrate(database, {
			migrationsFolder: './drizzle'
		})

		console.log('Migrations completed')

		process.exit(0)
	} catch (error) {
		console.error(error)

		process.exit(1)
	}
}

main()

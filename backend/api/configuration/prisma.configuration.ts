import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { env } from './env.configuration.js'

const adapter = new PrismaPg({
	connectionString: env.databaseUrl
})

export const prisma = new PrismaClient({ adapter })

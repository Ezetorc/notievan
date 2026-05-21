import { eq } from 'drizzle-orm'
import type { Token } from '../models/token.model.js'
import { database } from 'server/database/database.configuration.js'
import { tokens } from 'server/database/schemas/tokens.schema.js'

export class TokensRepository {
	static async findByName(name: string): Promise<Token | null> {
		const result = await database
			.select()
			.from(tokens)
			.where(eq(tokens.name, name))
			.limit(1)

		return result[0] ?? null
	}

	static async update(name: string, data: Partial<Token>): Promise<void> {
		await database.update(tokens).set(data).where(eq(tokens.name, name))
	}
}

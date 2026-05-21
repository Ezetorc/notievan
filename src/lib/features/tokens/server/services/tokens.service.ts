import { ErrorCode } from 'shared/models/error-code.model.js'
import type { Token } from '../models/token.model.js'
import { TokensRepository } from '../repositories/tokens.repository.js'
import { error } from '@sveltejs/kit'

export class TokensService {
	static async getByName(name: string): Promise<Token> {
		const token = await TokensRepository.findByName(name)

		if (!token) {
			throw error(404, ErrorCode.TOKEN_NOT_FOUND)
		}

		return token
	}

	static async update(name: string, data: Partial<Token>): Promise<void> {
		const token = await TokensRepository.findByName(name)

		if (!token) {
			throw error(404, ErrorCode.TOKEN_NOT_FOUND)
		}

		await TokensRepository.update(name, data)
	}
}

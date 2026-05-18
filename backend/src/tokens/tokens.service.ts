import { ErrorCode } from '../../../shared/src/models/error-code.model.js'
import { NotFoundError } from '../errors/not-found.error.js'
import type { Token } from './token.model.js'
import { TokensRepository } from './tokens.repository.js'

export class TokensService {
	static async getByName(name: string): Promise<Token> {
		const token = await TokensRepository.findByName(name)

		if (!token) {
			throw new NotFoundError(ErrorCode.TOKEN_NOT_FOUND)
		}

		return token
	}

	static async update(name: string, data: Partial<Token>): Promise<void> {
		const token = await TokensRepository.findByName(name)

		if (!token) {
			throw new NotFoundError(ErrorCode.TOKEN_NOT_FOUND)
		}

		await TokensRepository.update(name, data)
	}
}

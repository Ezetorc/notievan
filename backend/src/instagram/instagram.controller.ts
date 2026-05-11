import type { Request, Response } from 'express'
import { InstagramService } from './instagram.service.js'

export class InstagramController {
	static async refreshAccessToken(
		_request: Request,
		response: Response
	): Promise<Response> {
		await InstagramService.refreshAccessToken()

		return response.status(200).send()
	}
}

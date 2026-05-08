import { env } from '../configuration/env.configuration.js'

export class TemplatedService {
	static BASE_URL: string = 'https://api.templated.io/v1'

	static async upload({
		templateId,
		layers,
		format = 'jpg'
	}: {
		templateId: string
		layers: Record<string, any>
		format?: string
	}) {
		return fetch(`${TemplatedService.BASE_URL}/render`, {
			method: 'POST',
			body: JSON.stringify({
				template: templateId,
				format,
				layers
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.templated.apiKey}`
			}
		}).then((response) => response.json())
	}
}

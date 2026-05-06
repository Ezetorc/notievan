import { z } from 'zod'

const envSchema = z.object({
	API_URL: z
		.url()
		.default('http://localhost:3000')
		.transform((url) => url.replace(/\/+$/, ''))
})

const parsed = envSchema.safeParse(import.meta)

if (!parsed.success) {
	console.error(
		'❌ Invalid environment variables:',
		z.treeifyError(parsed.error).properties
	)
	throw new Error('Invalid environment variables')
}

const { API_URL } = parsed.data

export const env = {
	baseUrl: API_URL
}

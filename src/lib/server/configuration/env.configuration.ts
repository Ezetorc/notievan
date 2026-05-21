import * as privateEnv from '$env/static/private'

import { coerce, object, string, treeifyError } from 'zod'

const envSchema = object({
	NODE_ENV: string().default('development'),

	SHOW_FULL_ERRORS: coerce.boolean().default(false),

	PORT: coerce.number().default(3000),

	DATABASE_URL: string().min(1, 'DATABASE_URL is required'),

	JWT_SECRET: string().min(1, 'JWT_SECRET is required'),

	JWT_EXPIRES_IN: string().default('24h'),

	INSTAGRAM_BUSINESS_ACCOUNT_ID: string().min(
		1,
		'INSTAGRAM_BUSINESS_ACCOUNT_ID is required'
	),

	CLOUDINARY_CLOUD_NAME: string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),

	CLOUDINARY_API_KEY: string().min(1, 'CLOUDINARY_API_KEY is required'),

	CLOUDINARY_API_SECRET: string().min(1, 'CLOUDINARY_API_SECRET is required')
})

const parsed = envSchema.safeParse(privateEnv)

if (!parsed.success) {
	console.error(
		'❌ Invalid environment variables:',
		treeifyError(parsed.error).properties
	)
	throw new Error('Invalid environment variables')
}

const {
	NODE_ENV,
	PORT,
	DATABASE_URL,
	SHOW_FULL_ERRORS,
	INSTAGRAM_BUSINESS_ACCOUNT_ID,
	JWT_EXPIRES_IN,
	JWT_SECRET,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME
} = parsed.data

export const env = {
	nodeEnv: NODE_ENV,
	port: PORT,
	databaseUrl: DATABASE_URL,
	showFullErrors: SHOW_FULL_ERRORS,
	instagram: {
		businessAccountId: INSTAGRAM_BUSINESS_ACCOUNT_ID
	},
	jwt: {
		secret: JWT_SECRET,
		expiresIn: JWT_EXPIRES_IN
	},

	cloudinary: {
		cloudName: CLOUDINARY_CLOUD_NAME,
		apiKey: CLOUDINARY_API_KEY,
		apiSecret: CLOUDINARY_API_SECRET
	}
}

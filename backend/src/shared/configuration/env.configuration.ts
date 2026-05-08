import { z } from 'zod'

if (process.env.NODE_ENV !== 'production') {
	process.loadEnvFile()
}

const envSchema = z.object({
	NODE_ENV: z.string().default('development'),

	SHOW_FULL_ERRORS: z.coerce.boolean().default(false),

	PORT: z.coerce.number().default(3000),

	DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

	JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),

	JWT_EXPIRES_IN: z.string().default('24h'),

	INSTAGRAM_BUSINESS_ACCOUNT_ID: z
		.string()
		.min(1, 'INSTAGRAM_BUSINESS_ACCOUNT_ID is required'),

	INSTAGRAM_ACCESS_TOKEN: z
		.string()
		.min(1, 'INSTAGRAM_ACCESS_TOKEN is required'),

	TEMPLATED_API_KEY: z.string().min(1, 'TEMPLATED_API_KEY is required'),

	CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),

	CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),

	CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required')
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
	console.error(
		'❌ Invalid environment variables:',
		z.treeifyError(parsed.error).properties
	)
	throw new Error('Invalid environment variables')
}

const {
	NODE_ENV,
	PORT,
	DATABASE_URL,
	SHOW_FULL_ERRORS,
	INSTAGRAM_BUSINESS_ACCOUNT_ID,
	INSTAGRAM_ACCESS_TOKEN,
	JWT_EXPIRES_IN,
	JWT_SECRET,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
	TEMPLATED_API_KEY
} = parsed.data

export const env = {
	nodeEnv: NODE_ENV,
	port: PORT,
	databaseUrl: DATABASE_URL,
	showFullErrors: SHOW_FULL_ERRORS,
	instagram: {
		businessAccountId: INSTAGRAM_BUSINESS_ACCOUNT_ID,
		accessToken: INSTAGRAM_ACCESS_TOKEN
	},
	jwt: {
		secret: JWT_SECRET,
		expiresIn: JWT_EXPIRES_IN
	},

	cloudinary: {
		cloudName: CLOUDINARY_CLOUD_NAME,
		apiKey: CLOUDINARY_API_KEY,
		apiSecret: CLOUDINARY_API_SECRET
	},
	templated: {
		apiKey: TEMPLATED_API_KEY
	}
}

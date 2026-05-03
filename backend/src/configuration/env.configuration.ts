import { z } from 'zod'

if (process.env.NODE_ENV !== 'production') {
	process.loadEnvFile()
}

const envSchema = z.object({
	NODE_ENV: z.string().default('development'),

	SHOW_FULL_ERRORS: z.coerce.boolean().default(false),

	PORT: z.coerce.number().default(3000),

	DATABASE_URL: z
		.string()
		.min(1, 'DATABASE_URL is required'),

	JWT_SECRET: z
		.string()
		.min(1, 'JWT_SECRET is required'),

	JWT_EXPIRES_IN: z
		.string()
		.default('24h'),

	CLOUDINARY_CLOUD_NAME: z
		.string()
		.min(1, 'CLOUDINARY_CLOUD_NAME is required'),

	CLOUDINARY_API_KEY: z
		.string()
		.min(1, 'CLOUDINARY_API_KEY is required'),

	CLOUDINARY_API_SECRET: z
		.string()
		.min(1, 'CLOUDINARY_API_SECRET is required'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
	console.error('❌ Invalid environment variables:', z.treeifyError(parsed.error).properties)
	throw new Error('Invalid environment variables')
}

export const env = {
	nodeEnv: parsed.data.NODE_ENV,
	port: parsed.data.PORT,
	databaseUrl: parsed.data.DATABASE_URL,
	showFullErrors: parsed.data.SHOW_FULL_ERRORS,

	jwt: {
		secret: parsed.data.JWT_SECRET,
		expiresIn: parsed.data.JWT_EXPIRES_IN,
	},

	cloudinary: {
		cloudName: parsed.data.CLOUDINARY_CLOUD_NAME,
		apiKey: parsed.data.CLOUDINARY_API_KEY,
		apiSecret: parsed.data.CLOUDINARY_API_SECRET,
	},
}
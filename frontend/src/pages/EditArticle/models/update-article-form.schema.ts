import z from 'zod'

export const UpdateArticleSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	description: z.string().min(1),
	content: z.string().min(1),
	imageUrl: z.url().optional().or(z.literal('')),
	imageFile: z.instanceof(File).optional()
})

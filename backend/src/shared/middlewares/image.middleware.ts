import type { RequestHandler } from 'express'
import multer from 'multer'

export const multerInstance = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 }
})

export function imageMiddleware(name = 'image'): RequestHandler {
	return multerInstance.single(name)
}

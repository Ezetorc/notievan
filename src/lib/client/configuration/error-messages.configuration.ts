import type { ErrorCode } from 'shared/models/error-code.model'

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
	EMAIL_IN_USE: 'El email ya está en uso',
	NAME_IN_USE: 'El nombre ya está en uso',
	WRONG_EMAIL: 'El email es incorrecto',
	WRONG_PASSWORD: 'La contraseña es incorrecta',
	INVALID_TOKEN: 'El token no es válido',
	TOKEN_NOT_FOUND: 'Token no encontrado',
	USER_NOT_FOUND: 'Usuario no encontrado',
	COMMENT_NOT_FOUND: 'Comentario no encontrado',
	ARTICLE_NOT_FOUND: 'Artículo no encontrado',
	IMAGE_NOT_FOUND: 'Imágen no encontrada',
	FORBIDDEN: 'No tienes permiso para realizar esta acción',
	INSTAGRAM_ERROR: 'Error al obtener datos de Instagram',
	FILE_TOO_LARGE: 'El archivo es demasiado grande',
	INVALID_IMAGE: 'La imagen no es válida',
	UNEXPECTED_ERROR: 'Ocurrió un error inesperado'
}

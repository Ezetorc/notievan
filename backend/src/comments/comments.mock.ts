import type { Comment } from '../../../shared/src/models/comment.model.js'
import { userMock } from '../users/users.mock.js'

export const commentMock: Comment & { authorName: string } = {
	id: 'clx9k2j8f0001z8a1b2c3d4e5',
	createdAt: new Date('2026-05-06T15:00:00.000Z'),
	authorId: userMock.id,
	content: 'Este es un comentario de prueba generado automáticamente.',
	articleId: 'clx9k2j8f0003z8a1j0k1l2m3',
	authorName: userMock.name
}

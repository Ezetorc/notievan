import { articleMock } from '../articles/articles.mock.js'
import { userMock } from '../users/users.mock.js'
import type { CommentWithAuthorName } from './comment-with-author-name.model.js'

export const commentMock: CommentWithAuthorName = {
	id: 'clx9k2j8f0001z8a1b2c3d4e5',
	createdAt: new Date('2026-05-06T15:00:00.000Z'),
	authorId: userMock.id,
	content: 'Proof comment automatically generated',
	articleId: articleMock.id,
	authorName: userMock.name
}

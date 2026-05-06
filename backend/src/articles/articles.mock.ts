import type { Article } from '../../../shared/src/models/article.model.js'
import { userMock } from '../users/users.mock.js'

export const articleMock: Article & { authorName: string } = {
	authorId: userMock.id,
	authorName: 'Juan Perez',
	createdAt: new Date('2024-03-15T10:30:00Z'),
	title: 'The Future of Web Development',
	subtitle: 'Trends shaping modern applications',
	description: 'An overview of tech',
	content: `
    Web development continues to evolve rapidly, driven by new frameworks,
    performance demands, and user expectations. Developers are increasingly
    adopting TypeScript, serverless architectures, and edge computing to build
    scalable and maintainable systems.

    In this article, we explore key trends such as component-driven design,
    API-first development, and the growing importance of developer experience.
  `,
	image: 'https://example.com/images/web-development-future.jpg',
	id: 'ckv9z0a1b0001qzrmn832efgh'
}

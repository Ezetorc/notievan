export const QueryKeys = {
	Articles: {
		Single: (id: string) => ['article', id],
		Multiple: {
			Account: (limit: number) => ['articles', 'account', limit],
			All: (limit: number) => ['articles', 'all', limit],
			Random: (limit: number, excludeId: string) => [
				'articles',
				'random',
				limit,
				excludeId
			],
			Base: 'articles'
		}
	},
	Comments: (articleId: string, limit?: number) =>
		limit ? ['comments', articleId, limit] : ['comments', articleId],
	RandomImage: (id?: string) => ['random-image', id ?? '<unknown>'],
	User: {
		Self: ['self-user'],
		Single: (id?: string) => ['user', id ?? '<unknown>'],
		Multiple: {
			Base: 'users',
			All: (limit: number) => ['users', 'all', limit]
		}
	}
}

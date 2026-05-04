import { useInfiniteQuery } from '@tanstack/react-query'
import { ArticlesService } from '../services/articles.service'
import type { ArticlePreviewOut } from '../../../shared/src/dtos/out/article-preview-out.dto'

type usePaginatedArticlesOptions = {
	type?: 'all' | 'own' | 'random'
	excludeId?: string
	initialPage?: number
	limit?: number
}

export function usePaginatedArticles({
	type = 'all',
	excludeId,
	initialPage = 1,
	limit = 4
}: usePaginatedArticlesOptions) {
	const query = useInfiniteQuery({
		queryKey: excludeId
			? ['articles', type, limit, initialPage, excludeId]
			: ['articles', type, limit, initialPage],

		queryFn: async ({ pageParam }): Promise<ArticlePreviewOut[]> => {
			const page = pageParam !== undefined ? pageParam : initialPage

			switch (type) {
				case 'own':
					return ArticlesService.getOwn({ page, limit })
				case 'random':
					if (excludeId)
						return ArticlesService.getRandom({ omitId: excludeId, limit })
					return []
				default:
					return ArticlesService.getAll({ page, limit })
			}
		},

		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < limit) return undefined
			return allPages.length + initialPage
		},

		initialPageParam: initialPage,
		staleTime: 0,
		gcTime: 0,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})

	const articles = query.data?.pages.flat() ?? []

	const hasMore = !!query.hasNextPage
	const loading = query.isFetching && !query.isFetchingNextPage

	const loadMore = () => {
		if (hasMore) query.fetchNextPage()
	}

	return {
		articles,
		loading,
		hasMore,
		loadMore
	}
}

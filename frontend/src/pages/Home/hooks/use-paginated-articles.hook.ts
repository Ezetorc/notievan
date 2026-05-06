import { useInfiniteQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../../models/query-keys.model'
import { ArticlesService } from '../../../services/articles.service'

export function usePaginatedArticles({ limit = 4 }: { limit?: number }) {
	const query = useInfiniteQuery({
		queryKey: QueryKeys.Articles.Multiple.All(limit),

		queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
			return ArticlesService.getAll({
				cursor: pageParam,
				limit
			})
		},

		getNextPageParam: (lastPage) => {
			return lastPage.nextCursor ?? undefined
		},

		initialPageParam: undefined
	})

	const articles = query.data?.pages.flatMap((p) => p.data) ?? []

	const hasMore = !!query.hasNextPage
	const loading = query.isFetching && !query.isFetchingNextPage

	const loadMore = () => {
		if (hasMore) {
			query.fetchNextPage()
		}
	}

	return {
		articles,
		loading,
		hasMore,
		loadMore
	}
}

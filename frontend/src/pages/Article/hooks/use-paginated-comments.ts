import { useInfiniteQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../../models/query-keys.model'
import { CommentsService } from '../../../services/comments.service'

type UsePaginatedCommentsOptions = {
	limit?: number
	articleId: string
}

export function usePaginatedComments({
	limit = 4,
	articleId
}: UsePaginatedCommentsOptions) {
	const query = useInfiniteQuery({
		queryKey: QueryKeys.Comments(articleId, limit),

		queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
			return CommentsService.getAllOfArticle({
				articleId,
				cursor: pageParam,
				limit
			})
		},

		getNextPageParam: (lastPage) => {
			return lastPage.nextCursor ?? undefined
		},

		initialPageParam: undefined
	})

	const comments = query.data?.pages.flatMap((p) => p.data) ?? []

	const hasMore = !!query.hasNextPage
	const loading = query.isFetching && !query.isFetchingNextPage

	const loadMore = () => {
		if (hasMore) {
			query.fetchNextPage()
		}
	}

	return {
		comments,
		loading,
		hasMore,
		loadMore
	}
}

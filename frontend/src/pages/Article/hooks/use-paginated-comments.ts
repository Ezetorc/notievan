import { useInfiniteQuery } from '@tanstack/react-query'
import { CommentsService } from '../../../services/comments.service'
import type { Comment } from '../../../../../shared/src/models/comment.model'

type UsePaginatedCommentsOptions = {
	initialPage?: number
	limit?: number
	articleId: string
}

export function usePaginatedComments({
	initialPage = 1,
	limit = 4,
	articleId
}: UsePaginatedCommentsOptions) {
	const query = useInfiniteQuery({
		queryKey: ['comments', articleId],
		queryFn: async ({ pageParam = initialPage }): Promise<Comment[]> =>
			CommentsService.getAllOfArticle({ page: pageParam, limit, articleId }),
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < limit) return undefined
			return allPages.length + initialPage
		},
		initialPageParam: initialPage
	})

	const comments = query.data?.pages.flat() ?? []

	const hasMore = !!query.hasNextPage
	const loading = query.isFetching && !query.isFetchingNextPage

	const loadMore = () => {
		if (hasMore) query.fetchNextPage()
	}

	return {
		comments,
		loading,
		hasMore,
		loadMore
	}
}

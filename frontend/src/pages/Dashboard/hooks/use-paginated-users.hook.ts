import { useInfiniteQuery } from '@tanstack/react-query'
import { UsersService } from '../../../services/users.service'

export function usePaginatedUsers({ limit = 4 }: { limit?: number } = {}) {
	const query = useInfiniteQuery({
		queryKey: ['users', limit],

		queryFn: async ({ pageParam }: { pageParam?: string }) => {
			return UsersService.getAll({
				cursor: pageParam,
				limit
			})
		},

		getNextPageParam: (lastPage) => {
			return lastPage.nextCursor ?? undefined
		},

		initialPageParam: undefined
	})

	const users = query.data?.pages.flatMap((p) => p.data) ?? []

	const hasMore = !!query.hasNextPage
	const loading = query.isFetching && !query.isFetchingNextPage

	const loadMore = () => {
		if (hasMore) query.fetchNextPage()
	}

	return {
		users,
		loading,
		hasMore,
		loadMore
	}
}

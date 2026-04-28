import { useInfiniteQuery } from '@tanstack/react-query'
import { UsersService } from '../services/users.service'
import type { SanitizedUser } from '../../../backend/api/models/sanitized-user.model.js'

type usePaginatedUsersOptions = {
	initialPage?: number
	limit?: number
}

export function usePaginatedUsers({
	initialPage = 1,
	limit = 4
}: usePaginatedUsersOptions = {}) {
	const query = useInfiniteQuery({
		queryKey: ['users'],
		queryFn: async ({ pageParam = initialPage }): Promise<SanitizedUser[]> =>
			UsersService.getAll({ page: pageParam, limit }),
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < limit) return undefined
			return allPages.length + initialPage
		},
		initialPageParam: initialPage
	})

	const users = query.data?.pages.flat() ?? []

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

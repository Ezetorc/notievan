import { useQuery } from '@tanstack/react-query'
import type { ArticlePreviewOut } from '../../../../../shared/src/dtos/out/article-preview-out.dto'
import { QueryKeys } from '../../../models/query-keys.model'
import { ArticlesService } from '../../../services/articles.service'

export function useRandomArticles({
	excludeId,
	limit = 4
}: {
	excludeId: string
	limit?: number
}) {
	const query = useQuery({
		queryKey: QueryKeys.Articles.Multiple.Random(limit, excludeId),

		queryFn: async (): Promise<ArticlePreviewOut[]> => {
			return ArticlesService.getRandom({ excludeId, limit })
		},

		staleTime: 0,
		gcTime: 0,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	})

	const articles = query.data ?? []
	const loading = query.isFetching && !query.isLoading

	return {
		articles,
		loading
	}
}

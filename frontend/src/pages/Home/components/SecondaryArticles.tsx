import { Article } from '../../../components/Article'
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll.hook'
import type { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'

const SKELETON_KEYS = ['s1', 's2', 's3', 's4']

export function SecondaryArticles({
	articles,
	hasMore,
	loadMore,
	loading
}: ReturnType<typeof usePaginatedArticles>) {
	const rest = articles.slice(3)

	const { sentinelRef } = useInfiniteScroll({
		hasMore,
		loading,
		onLoadMore: loadMore
	})

	if (rest.length === 0 && !loading) return null

	return (
		<section className='my-9'>
			<main className='grid grid-cols-1 gap-8 desktop:grid-cols-4'>
				{loading && rest.length === 0
					? SKELETON_KEYS.map((key) => (
							<Article key={key} article={undefined} />
						))
					: rest.map((article) => (
							<Article key={article.id} article={article} />
						))}
			</main>

			<div ref={sentinelRef} className='h-10' />

			{loading && rest.length > 0 && (
				<div className='mt-4 text-center'>Cargando...</div>
			)}
		</section>
	)
}

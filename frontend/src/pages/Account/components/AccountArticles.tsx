import { Article } from '../../../components/Article'
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll.hook'
import { usePaginatedAccountArticles } from '../../../hooks/use-paginated-account-articles.hook'

const SKELETON_KEYS = ['s1', 's2', 's3', 's4']

export function AccountArticles() {
	const { articles, hasMore, loadMore, loading } = usePaginatedAccountArticles()

	const { sentinelRef } = useInfiniteScroll({
		hasMore,
		loading,
		onLoadMore: loadMore
	})

	if (articles.length === 0 && !loading) return null

	return (
		<section className='my-9'>
			<main className='grid grid-cols-1 gap-8 desktop:grid-cols-4'>
				{loading && articles.length === 0
					? SKELETON_KEYS.map((index) => (
							<Article key={index} article={undefined} />
						))
					: articles.map((article) => (
							<Article key={article.id} article={article} />
						))}
			</main>

			<div ref={sentinelRef} className='h-10' />

			{loading && articles.length > 0 && (
				<div className='mt-4 text-center'>Cargando...</div>
			)}
		</section>
	)
}

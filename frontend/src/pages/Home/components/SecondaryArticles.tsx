import { Article } from '../../../components/Article'
import { LoadMoreButton } from '../../../components/LoadMoreButton'
import { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'

export function SecondaryArticles() {
	const { articles, hasMore, loadMore, loading } = usePaginatedArticles({
		type: 'all',
		initialPage: 2,
		limit: 4
	})

	if (articles.length === 0 && !loading) return null

	return (
		<section className='my-9'>
			<main className='grid grid-cols-1 gap-8 desktop:grid-cols-4'>
				{loading && articles.length === 0
					? Array.from({ length: 4 }).map((_, index) => (
							<Article key={index} article={undefined} />
						))
					: articles.map((article) => (
							<Article key={article.id} article={article} />
						))}
			</main>

			{hasMore && (
				<LoadMoreButton loading={loading} onClick={loadMore}>
					Ver más
				</LoadMoreButton>
			)}
		</section>
	)
}

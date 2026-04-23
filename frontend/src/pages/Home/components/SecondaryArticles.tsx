import { Article } from '../../../components/Article'
import { LoadMoreButton } from '../../../components/LoadMoreButton'
import { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'

const SKELETON_KEYS = ['s1', 's2', 's3', 's4']

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
					? SKELETON_KEYS.map((key) => (
							<Article key={key} article={undefined} />
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

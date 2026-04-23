import { Article } from '../../../components/Article'
import { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'

const SKELETON_KEYS = ['s1', 's2', 's3']

export function MainArticles() {
	const { articles, loading } = usePaginatedArticles({
		initialPage: 1,
		limit: 3
	})

	return (
		<main className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
			{loading && articles.length === 0
				? SKELETON_KEYS.map((key) => <Article key={key} article={undefined} />)
				: articles.map((article) => (
						<Article key={article.id} article={article} />
					))}
		</main>
	)
}

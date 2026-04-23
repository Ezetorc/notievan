import { Article } from '../../../components/Article'
import { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'

export function MainArticles() {
	const { articles, loading } = usePaginatedArticles({
		initialPage: 1,
		limit: 3
	})

	return (
		<main className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
			{loading
				? Array.from({ length: 3 }).map((_, index) => (
						<Article key={index} article={undefined} />
					))
				: articles.map((article) => (
						<Article key={article.id} article={article} />
					))}
		</main>
	)
}

import type { ArticlePreviewOut } from '../../../../../shared/src/dtos/out/article-preview-out.dto'
import { Article } from '../../../components/Article'

const SKELETON_KEYS = ['s1', 's2', 's3']

export function MainArticles({
	articles,
	loading
}: {
	articles: ArticlePreviewOut[]
	loading: boolean
}) {
	const firstThree = articles.slice(0, 3)

	return (
		<main className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
			{loading && firstThree.length === 0
				? SKELETON_KEYS.map((key) => <Article key={key} article={undefined} />)
				: firstThree.map((article) => (
						<Article key={article.id} article={article} />
					))}
		</main>
	)
}

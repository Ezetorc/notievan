import { Hero } from '../../../components/Hero'
import { usePaginatedArticles } from '../../../hooks/use-paginated-articles.hook'
import { MainArticles } from './MainArticles'
import { SecondaryArticles } from './SecondaryArticles'

export default function HomePage() {
	const query = usePaginatedArticles({ limit: 4 })

	return (
		<>
			<Hero
				title='NotiEvan'
				description='Descubrí lo que está pasando en el Evan'
			/>

			<MainArticles articles={query.articles} loading={query.loading} />
			<SecondaryArticles {...query} />
		</>
	)
}

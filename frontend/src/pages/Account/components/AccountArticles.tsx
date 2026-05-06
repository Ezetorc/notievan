import type { ArticlePreviewOut } from '../../../../../shared/src/dtos/out/article-preview-out.dto'
import { Article } from '../../../components/Article'
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll.hook'
import { usePaginatedAccountArticles } from '../hooks/use-paginated-account-articles.hook'

const SKELETON_KEYS = ['s1', 's2', 's3', 's4']

export function AccountArticles() {
	const { articles, hasMore, loadMore, loading } = usePaginatedAccountArticles()
	const { sentinelRef } = useInfiniteScroll({
		hasMore,
		loading,
		onLoadMore: loadMore
	})

	const isInitialLoading = loading && articles.length === 0
	const isEmpty = !loading && articles.length === 0

	if (isEmpty) {
		return null
	}

	return (
		<section className='my-9'>
			<main className='grid grid-cols-1 gap-8 desktop:grid-cols-4'>
				{isInitialLoading ? renderSkeletons() : renderArticles(articles)}
			</main>

			<div ref={sentinelRef} className='h-10' />

			{loading && <LoadingMore />}
		</section>
	)
}

function renderSkeletons() {
	return SKELETON_KEYS.map((key) => <Article key={key} article={undefined} />)
}

function renderArticles(articles: ArticlePreviewOut[]) {
	return articles.map((article) => (
		<Article key={article.id} article={article} />
	))
}

function LoadingMore() {
	return <div className='mt-4 text-center'>Cargando...</div>
}

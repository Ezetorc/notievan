import { useState } from 'react'
import { useLocation } from 'wouter'
import { useInfiniteScroll } from '../../../hooks/use-infinite-scroll.hook'
import { useSession } from '../../../hooks/use-session.hook'
import { usePaginatedComments } from '../hooks/use-paginated-comments'
import { CommentDisplay } from './CommentDisplay'
import { CreateCommentModal } from './CreateCommentModal'

export function ArticleComments({ articleId }: { articleId: string }) {
	const { user } = useSession()
	const [, setLocation] = useLocation()
	const { comments, hasMore, loading, loadMore } = usePaginatedComments({
		articleId
	})

	const { sentinelRef } = useInfiniteScroll({
		hasMore,
		loading,
		onLoadMore: loadMore
	})
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const handleCreateComment = () => {
		if (!user) {
			setLocation('/registro')

			return
		}

		setIsModalOpen(true)
	}

	return (
		<section className='my-9 w-full'>
			{isModalOpen && (
				<CreateCommentModal
					articleId={articleId}
					setIsModalOpen={setIsModalOpen}
				/>
			)}

			<button
				type='button'
				onClick={handleCreateComment}
				className='clickable w-full my-6 py-3 text-white font-bold text-2xl bg-brand-orange rounded-sm'
			>
				Comentar
			</button>

			<main className='flex flex-col gap-y-4'>
				{comments.map((comment) => (
					<CommentDisplay comment={comment} key={comment.id} />
				))}
			</main>

			<div ref={sentinelRef} className='h-10' />

			{loading && comments.length > 0 && (
				<div className='mt-4 text-center'>Cargando...</div>
			)}
		</section>
	)
}

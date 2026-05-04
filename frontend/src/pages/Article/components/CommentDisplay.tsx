import { getParsedDate } from '../../../utilities/get-parsed-date.utility'
import { useState } from 'react'
import { DeleteCommentModal } from './DeleteCommentModal'
import { useSession } from '../../../hooks/use-session.hook'
import type { CommentOut } from '../../../../../shared/src/dtos/out/comment-out.dto'

export function CommentDisplay({ comment }: { comment: CommentOut }) {
	const { user } = useSession()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<>
			{isModalOpen && (
				<DeleteCommentModal comment={comment} setIsModalOpen={setIsModalOpen} />
			)}

			<article className='mobile:w-full tablet:w-[70%] space-y-2 overflow-hidden'>
				<header className='flex justify-between items-center rounded-tr-2xl'>
					<div className='flex gap-x-4'>
						<h3 className='font-bold text-xl'>{comment.author.name}</h3>
						<time
							className='text-[16px]'
							dateTime={new Date(comment.createdAt).toISOString()}
						>
							{getParsedDate(comment.createdAt)}
						</time>
					</div>

					{comment.author.id === user?.id && (
						<button
							type='button'
							onClick={() => setIsModalOpen(true)}
							className='clickable text-brand-red'
						>
							Eliminar
						</button>
					)}
				</header>

				<main className='text-xl'>{comment.content}</main>
			</article>
		</>
	)
}

import { useState, type Dispatch, type SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ActionButton } from '../../../components/ActionButton'
import { Modal } from '../../../components/Modal'
import { CommentsService } from '../../../services/comments.service'
import type { Comment } from '../../../models/comment.model'

export function DeleteCommentModal({
	setIsModalOpen,
	comment
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	comment: Comment
}) {
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState<boolean>(false)

	const handleDelete = async () => {
		try {
			setLoading(true)
			await CommentsService.delete(comment.id)

			queryClient.invalidateQueries({
				queryKey: ['comments', comment.articleId]
			})
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal>
			<div className='p-6 mobile:w-[80vw] space-y-5 tablet:w-[40vw] bg-brand-blue rounded-2xl'>
				<h2 className='text-white text-6xl font-title'>
					¿Querés eliminar el comentario?
				</h2>

				<div className='space-x-6'>
					<button
						type='button'
						className='px-3 py-4 text-2xl bg-brand-orange clickable rounded text-white font-bold'
						onClick={() => setIsModalOpen(false)}
					>
						Cancelar
					</button>

					<ActionButton
						className='px-3 py-4 text-2xl text-white font-bold bg-brand-red'
						onClick={handleDelete}
						loading={loading}
					>
						Eliminar
					</ActionButton>
				</div>
			</div>
		</Modal>
	)
}

import { useState, type Dispatch, type SetStateAction } from 'react'
import { ActionButton } from '../../../components/ActionButton'
import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { CommentsService } from '../../../services/comments.service'
import { Modal } from '../../../components/Modal'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { useForm } from '../../../hooks/use-form.hook'
import type { Comment } from '../../../../../shared/src/models/comment.model'
import { CreateCommentDto, type CreateCommentDtoType } from "../../../../../shared/src/dtos/in/create-comment.dto"

export function CreateCommentModal({
	setIsModalOpen,
	articleId
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	articleId: string
}) {
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const onSuccess = async (data: CreateCommentDtoType) => {
		try {
			setLoading(true)
			const comment = await CommentsService.create(data)
			queryClient.setQueryData(
				['comments', articleId],
				(prevComments: InfiniteData<Comment[]>) => {
					if (!prevComments) return prevComments

					return {
						...prevComments,
						pages: [...prevComments.pages, [comment]]
					}
				}
			)
			setIsModalOpen(false)
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Error creando el comentario')
			}
		} finally {
			setLoading(false)
		}
	}

	const {
		error: schemaError,
		onSubmit,
		watch
	} = useForm(onSuccess, CreateCommentDto, {
		content: '',
		articleId
	})

	return (
		<Modal>
			<form
				onSubmit={onSubmit}
				className='p-6 mobile:w-[90vw] space-y-5 tablet:w-[40vw] bg-brand-blue rounded-2xl'
			>
				<header className='w-full flex justify-between'>
					<h2 className='text-white text-6xl font-title'>
						Crear nuevo comentario
					</h2>

					<button
						type='button'
						className='clickable text-4xl text-white font-bold'
						onClick={() => setIsModalOpen(false)}
					>
						X
					</button>
				</header>

				<textarea
					onInput={(event) => watch('content', event.currentTarget.value)}
					placeholder='Me gustó este artículo porque...'
					className='w-full bg-brand-blue-light rounded-2xl p-4 text-2xl h-[200px] resize-none'
				/>

				<ErrorMessage value={error} />
				<ErrorMessage value={schemaError} />

				<ActionButton
					type='submit'
					loading={loading}
					className='text-2xl bg-brand-orange text-white font-bold py-3 w-full'
				>
					Crear comentario
				</ActionButton>
			</form>
		</Modal>
	)
}

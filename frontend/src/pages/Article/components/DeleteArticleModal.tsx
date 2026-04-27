import { useState, type Dispatch, type SetStateAction } from 'react'
import { useLocation } from 'wouter'
import { ArticlesService } from '../../../services/articles.service'
import { useQueryClient } from '@tanstack/react-query'
import { ActionButton } from '../../../components/ActionButton'
import { Modal } from '../../../components/Modal'
import type { Article } from '../../../models/article.model'

export function DeleteArticleModal({
	setIsModalOpen,
	article
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	article: Article
}) {
	const queryClient = useQueryClient()
	const [, setLocation] = useLocation()
	const [loading, setLoading] = useState<boolean>(false)

	const handleDelete = async () => {
		try {
			setLoading(true)
			await ArticlesService.delete(article.id)

			setLocation('/')

			queryClient.invalidateQueries({ queryKey: ['article', article.id] })
			queryClient.invalidateQueries({
				predicate: ({ queryKey }) =>
					Array.isArray(queryKey) && queryKey[0] === 'articles'
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
					¿Querés eliminar el artículo: "{article.title}"?
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

import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useLocation } from 'wouter'
import type { ArticleOut } from '../../../../../shared/src/dtos/out/article-out.dto'
import { ActionButton } from '../../../components/ActionButton'
import { Modal } from '../../../components/Modal'
import { QueryKeys } from '../../../models/query-keys.model'
import { ArticlesService } from '../../../services/articles.service'

export function DeleteArticleModal({
	setIsModalOpen,
	article
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>
	article: ArticleOut
}) {
	const queryClient = useQueryClient()
	const [, setLocation] = useLocation()
	const [loading, setLoading] = useState<boolean>(false)

	const handleDelete = async () => {
		try {
			setLoading(true)
			await ArticlesService.delete(article.id)

			setLocation('/')

			queryClient.invalidateQueries({
				queryKey: QueryKeys.Articles.Single(article.id)
			})
			queryClient.invalidateQueries({
				predicate: ({ queryKey }) =>
					Array.isArray(queryKey) &&
					queryKey[0] === QueryKeys.Articles.Multiple.Base
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

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation } from 'wouter'

import { ActionButton } from '../../../components/ActionButton'
import { ArticleInput } from '../../../components/ArticleInput'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { ImageInput } from '../../../components/ImageInput'
import { Loading } from '../../../components/Loading'
import { MarkdownEditor } from '../../../components/MarkdownEditor'

import { useArticle } from '../../../hooks/use-article.hook'
import { useForm } from '../../../hooks/use-form.hook'

import { QueryKeys } from '../../../models/query-keys.model'

import { ArticlesService } from '../../../services/articles.service'

import NotFoundPage from '../../NotFoundPage'
import type { UpdateArticleForm } from '../models/update-article-form.model'
import { UpdateArticleSchema } from '../models/update-article-form.schema'

export default function EditArticlePage({ id }: { id: string }) {
	const { article, isLoading, isError } = useArticle(id)

	const [, setLocation] = useLocation()

	const queryClient = useQueryClient()

	const [isEditing, setIsEditing] = useState(false)

	const [error, setError] = useState('')

	const onSuccess = async (data: UpdateArticleForm) => {
		try {
			setIsEditing(true)

			const image = data.imageFile ?? data.imageUrl

			if (!image) {
				throw new Error('Debe proporcionar una imagen')
			}

			await ArticlesService.update(
				{
					title: data.title,
					subtitle: data.subtitle,
					description: data.description,
					content: data.content,
					image
				},
				id
			)

			queryClient.invalidateQueries({
				queryKey: QueryKeys.Articles.Single(id)
			})

			queryClient.invalidateQueries({
				predicate: (q) =>
					Array.isArray(q.queryKey) &&
					q.queryKey[0] === QueryKeys.Articles.Multiple.Base
			})

			setLocation(`/articulos/${id}`)
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Error editando artículo')
			}
		} finally {
			setIsEditing(false)
		}
	}

	const {
		error: schemaError,
		onSubmit,
		watch
	} = useForm<UpdateArticleForm>(onSuccess, UpdateArticleSchema, {
		imageUrl: article?.image || '',
		imageFile: undefined,
		content: article?.content || '',
		description: article?.description || '',
		title: article?.title || '',
		subtitle: article?.subtitle || ''
	})

	if (isLoading) {
		return <Loading />
	}

	if (isError || !article) {
		return <NotFoundPage />
	}

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col pb-[5vw] mobile:mt-5 tablet:mt-[60px]'
		>
			<ArticleInput
				placeholder='Subtítulo de tu artículo...'
				minLength={1}
				maxLength={50}
				className='mobile:text-[20px] tablet:text-2xl font-bold font-text mb-5'
				onChange={(value) => watch('subtitle', value)}
				defaultValue={article.subtitle}
			/>

			<ArticleInput
				placeholder='Título de tu artículo...'
				minLength={1}
				maxLength={50}
				className='mobile:text-4xl tablet:text-5xl font-title'
				onChange={(value) => watch('title', value)}
				defaultValue={article.title}
			/>

			<ArticleInput
				className='mt-5 mobile:text-[20px] tablet:text-2xl mb-[30px]'
				placeholder='Descripción de tu artículo...'
				minLength={1}
				maxLength={50}
				onChange={(value) => watch('description', value)}
				defaultValue={article.description}
			/>

			<div className='flex flex-col tablet:grid gap-6 tablet:gap-x-10 w-full tablet:grid-cols-[1fr] desktop:grid-cols-[3fr_1fr]'>
				<div className='flex flex-col gap-y-4 tablet:gap-y-6 max-w-full order-2 tablet:order-1'>
					<MarkdownEditor
						onChange={(value) => watch('content', value)}
						placeholder='Contenido de tu artículo...'
						value={article.content}
					/>

					<ErrorMessage value={error} />

					<ErrorMessage value={schemaError} />
				</div>

				<aside className='flex flex-col gap-y-5 order-1 tablet:order-2'>
					<ImageInput
						value={article.image}
						onImageSelected={(value) => {
							if (value instanceof File) {
								watch('imageFile', value)
								watch('imageUrl', '')
							} else {
								watch('imageUrl', value)
								watch('imageFile', undefined)
							}
						}}
					/>
				</aside>

				<div className='w-full order-3'>
					<ActionButton
						className='w-full bg-brand-orange text-white font-bold text-xl tablet:text-3xl h-[50px] tablet:h-[70px]'
						loading={isEditing}
						type='submit'
					>
						Editar artículo
					</ActionButton>
				</div>
			</div>
		</form>
	)
}

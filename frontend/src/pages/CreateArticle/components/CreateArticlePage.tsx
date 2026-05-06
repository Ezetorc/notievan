import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation } from 'wouter'
import { CreateArticleDto } from '../../../../../shared/src/dtos/in/create-article.dto'
import { ActionButton } from '../../../components/ActionButton'
import { ArticleInput } from '../../../components/ArticleInput'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { ImageInput } from '../../../components/ImageInput'
import { MarkdownEditor } from '../../../components/MarkdownEditor'
import { useForm } from '../../../hooks/use-form.hook'
import { QueryKeys } from '../../../models/query-keys.model'
import { ArticlesService } from '../../../services/articles.service'
import type { CreateArticleForm } from '../models/create-article-form.model'
import { CreateArticleSchema } from '../models/create-article-form.schema'

export default function CreateArticlePage() {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>('')

	const onSuccess = async (data: CreateArticleForm) => {
		try {
			setIsLoading(true)

			const image = data.imageFile ?? data.imageUrl

			if (!image) {
				throw new Error('Debe proporcionar una imagen')
			}

			const newArticle = await ArticlesService.create({
				title: data.title,
				subtitle: data.subtitle,
				description: data.description,
				content: data.content,
				image
			})

			queryClient.invalidateQueries({
				queryKey: QueryKeys.Articles.Single(newArticle.id)
			})
			queryClient.invalidateQueries({
				predicate: (q) =>
					Array.isArray(q.queryKey) &&
					q.queryKey[0] === QueryKeys.Articles.Multiple.Base
			})

			setLocation(`/articulos/${newArticle.id}`)
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Error creando el artículo')
			}
		} finally {
			setIsLoading(false)
		}
	}

	const {
		error: schemaError,
		onSubmit,
		watch
	} = useForm<CreateArticleForm>(
		async (data) => {
			const parsed = CreateArticleDto.parse({
				title: data.title,
				subtitle: data.subtitle,
				description: data.description,
				content: data.content,
				image: data.imageUrl
			})

			await onSuccess({
				...data,
				imageUrl: parsed.image
			})
		},
		CreateArticleSchema,
		{
			imageFile: undefined,
			imageUrl: '',
			content: '',
			description: '',
			title: '',
			subtitle: ''
		}
	)

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
			/>

			<ArticleInput
				placeholder='Título de tu artículo...'
				minLength={1}
				maxLength={50}
				className='mobile:text-4xl tablet:text-5xl font-title'
				onChange={(value) => watch('title', value)}
			/>

			<ArticleInput
				className='mt-5 mobile:text-[20px] tablet:text-2xl  mb-[30px]'
				placeholder='Descripción de tu artículo...'
				minLength={1}
				maxLength={50}
				onChange={(value) => watch('description', value)}
			/>

			<div className='flex flex-col tablet:grid gap-6 tablet:gap-x-10 w-full tablet:grid-cols-[1fr] desktop:grid-cols-[3fr_1fr]'>
				<div className='flex flex-col gap-y-4 tablet:gap-y-6 max-w-full order-2 tablet:order-1'>
					<MarkdownEditor
						onChange={(value) => watch('content', value)}
						placeholder='Contenido de tu artículo...'
					/>

					<ErrorMessage value={error} />
					<ErrorMessage value={schemaError} />
				</div>

				<aside className='flex flex-col gap-y-5 order-1 md:order-2'>
					<ImageInput
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
						loading={isLoading}
						type='submit'
					>
						Crear artículo
					</ActionButton>
				</div>
			</div>
		</form>
	)
}

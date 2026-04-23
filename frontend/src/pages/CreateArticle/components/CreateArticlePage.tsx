import { useLocation } from 'wouter'
import { ArticleInput } from '../../../components/ArticleInput'
import { MarkdownEditor } from '../../../components/MarkdownEditor'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { ImageInput } from '../../../components/ImageInput'
import {
	CreateArticleSchema,
	type CreateArticleFormData
} from '../models/create-article-form-data.model'
import { useForm } from '../../../hooks/use-form.hook'
import { ArticlesService } from '../../../services/articles.service'
import { getFormDataFrom } from '../../../utilities/get-form-data-from.utility'
import { useQueryClient } from '@tanstack/react-query'
import { ActionButton } from '../../../components/ActionButton'
import { useState } from 'react'

export default function CreateArticlePage() {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>('')

	const onSuccess = async (data: CreateArticleFormData) => {
		try {
			setIsLoading(true)
			const formData = getFormDataFrom(data)
			const newArticle = await ArticlesService.create(formData)

			queryClient.invalidateQueries({ queryKey: ['article', newArticle.id] })
			queryClient.invalidateQueries({
				predicate: (q) =>
					Array.isArray(q.queryKey) && q.queryKey[0] === 'articles'
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
	} = useForm(onSuccess, CreateArticleSchema, {
		image: '',
		content: '',
		description: '',
		title: '',
		subtitle: ''
	})

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col pb-[5vw] mobile:mt-[20px] tablet:mt-[60px]'
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
					<ImageInput onImageSelected={(value) => watch('image', value)} />
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

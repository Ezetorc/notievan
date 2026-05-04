import { useArticle } from '../../../hooks/use-article.hook'
import { AsideArticles } from './AsideArticles'
import { useParsedMarkdown } from '../../../hooks/use-parsed-markdown.hook'
import { useState } from 'react'
import { useSession } from '../../../hooks/use-session.hook'
import { DeleteArticleModal } from './DeleteArticleModal'
import { ArticleComments } from './ArticleComments'

export default function ArticlePage({ id }: { id: string }) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const { article } = useArticle(id)
	const { user } = useSession()
	const parsedContent = useParsedMarkdown(article?.content)
	const isAuthor = user?.id === article?.author.id

	if (!article)
		return (
			<div className='animate-pulse mt-[60px]'>
				<div className='h-[70px] bg-gray-300 rounded w-[50%] mb-2.5'></div>
				<div className='h-[50px] bg-gray-300 rounded w-[75%] mb-[15px]'></div>
				<div className='h-6 bg-gray-300 rounded w-[20%] mb-[30px]'></div>

				<div className='space-y-3 w-[65%]'>
					<div className='h-6 bg-gray-300 rounded w-full'></div>
					<div className='h-6 bg-gray-300 rounded w-full'></div>
					<div className='h-6 bg-gray-300 rounded w-full'></div>
					<div className='h-6 bg-gray-300 rounded w-[90%]'></div>
				</div>
			</div>
		)

	return (
		<>
			{isModalOpen && (
				<DeleteArticleModal article={article} setIsModalOpen={setIsModalOpen} />
			)}

			<article className='mb-[200px]' id='article-section'>
				{isAuthor && (
					<div className='text-2xl space-x-5'>
						<a href={`/articulos/editar/${id}`} className='clickable'>
							Editar
						</a>
						<button
							type='button'
							onClick={() => setIsModalOpen(true)}
							className='clickable text-brand-red'
						>
							Eliminar
						</button>
					</div>
				)}

				<h1 className='text-[#0e1c40] font-title text-7xl mt-5 mb-2.5'>
					{article.title}
				</h1>
				<h2 className='text-gray-600 text-3xl mb-[15px]'>
					{article.description}
				</h2>
				<h3 className='text-gray-600 text-[18px] mb-[30px]'>{`Por ${article.author.name}`}</h3>

				<div className='grid gap-x-10 gap-y-10 desktop:grid-cols-[2fr_1fr]'>
					<div className='overflow-x-auto'>
						<article
							className='text-pretty text-gray-800 leading-relaxed text-2xl space-y-6 prose prose-lg prose-slate wrap-break-word'
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						></article>

						<ArticleComments articleId={id} />
					</div>

					<AsideArticles excludeId={id} />
				</div>
			</article>
		</>
	)
}

import type { ArticlePreviewOut } from '../../../shared/src/dtos/out/article-preview-out.dto'
import { useRandomImage } from '../hooks/use-random-image.hook'
import { isRecent } from '../pages/Home/utilities/is-recent.utility'

export function Article({ article }: { article?: ArticlePreviewOut }) {
	const { image } = useRandomImage({
		id: article?.id,
		enabled: !article?.image
	})

	if (!article) {
		return (
			<article className='animate-pulse flex flex-col w-full max-w-[400px] mx-auto'>
				<div className='h-[400px] w-full bg-gray-300 rounded-sm'></div>
				<div className='flex flex-col gap-y-2 w-full mt-4'>
					<div className='h-6 w-3/4 bg-gray-300 rounded' />
					<div className='h-8 w-full bg-gray-300 rounded mt-2' />
					<div className='h-4 w-1/2 bg-gray-300 rounded mt-2' />
				</div>
			</article>
		)
	}

	return (
		<a
			href={`/articulos/${article.id}`}
			className='group clickable block w-full max-w-[400px] mx-auto overflow-hidden'
		>
			<div className='relative w-full aspect-video bg-gray-100 rounded-sm overflow-hidden'>
				{isRecent(article.createdAt) && (
					<div className='absolute top-3 left-3 bg-brand-red text-white text-sm font-bold px-3 py-1 rounded-sm z-10'>
						NUEVO
					</div>
				)}
				<img
					loading='lazy'
					src={article?.image || image}
					alt={article.title}
					className='w-full h-full object-cover'
				/>
			</div>

			<div className='flex flex-col gap-y-2 w-full mt-4'>
				<div className='flex flex-col gap-y-2 w-full'>
					<h4 className='text-brand-red text-3xl wrap-break-word'>
						{article.subtitle}
					</h4>

					<h3 className='text-black font-bold line-clamp-4 text-3xl wrap-break-word'>
						{article.title}
					</h3>

					<p className='text-gray-900 text-[18px] wrap-break-word'>
						{article.description}
					</p>

					<div className='text-gray-700 text-[18px] line-clamp-4 mt-2 wrap-break-word'>
						{article.author.name}
					</div>
				</div>
			</div>
		</a>
	)
}

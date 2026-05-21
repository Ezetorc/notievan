import sharp from 'sharp'
import { error } from '@sveltejs/kit'
import { CloudinaryService } from 'server/services/cloudinary.service'
import { ImageService } from 'server/services/image.service'
import { ErrorCode } from 'shared/models/error-code.model'
import type { Article } from '../models/article.model'

export class ArticleImageService {
	private static readonly IMAGE_WIDTH = 800
	private static readonly ARTICLES_FOLDER = 'articles'
	private static readonly INSTAGRAM_POSTS_FOLDER = 'instagram/posts'

	static async uploadPostImage({
		title,
		imageUrl
	}: {
		title: string
		imageUrl: string
	}): Promise<string> {
		const html = ArticleImageService.getPostTemplate(title, imageUrl)

		const buffer = await ImageService.generate({
			width: 1080,
			height: 1350,
			html
		})

		const postImageUrl = await CloudinaryService.upload({
			buffer,
			folder: ArticleImageService.INSTAGRAM_POSTS_FOLDER,
			fileName: `${Date.now()}-${title}.jpg`
		})

		return postImageUrl.secureUrl
	}

	static optimizeUrl(url: string): string {
		return CloudinaryService.optimizeUrl({
			url,
			width: ArticleImageService.IMAGE_WIDTH,
			quality: '75'
		})
	}

	static async updateArticleImage(params: {
		article: Article
		file: File
	}): Promise<string> {
		const { article, file } = params

		const previousPublicId = CloudinaryService.extractPublicId(article.image)

		if (previousPublicId) {
			await CloudinaryService.delete(previousPublicId)
		}

		const buffer = await file.arrayBuffer()

		const image = await CloudinaryService.upload({
			buffer: Buffer.from(buffer),
			fileName: file.name ?? article.title,
			folder: ArticleImageService.ARTICLES_FOLDER,
			transformations: [
				{
					width: 800,
					crop: 'limit'
				},
				{
					quality: 'auto'
				},
				{
					fetch_format: 'auto'
				}
			]
		})

		return image.secureUrl
	}

	static async uploadArticleImage(
		image: File | string | undefined
	): Promise<string> {
		if (!image) {
			throw error(400, ErrorCode.IMAGE_NOT_FOUND)
		}

		if (image instanceof File) {
			const buffer = await image.arrayBuffer()

			const optimizedBuffer = await sharp(Buffer.from(buffer))
				.resize(1200)
				.webp({ quality: 75 })
				.toBuffer()

			const uploadResult = await CloudinaryService.upload({
				buffer: optimizedBuffer,
				fileName: image.name,
				folder: ArticleImageService.ARTICLES_FOLDER
			})

			image = uploadResult.secureUrl
		} else {
			throw error(400, ErrorCode.IMAGE_NOT_FOUND)
		}

		return image
	}

	static async deleteArticleImage(article: Article): Promise<void> {
		if (article.image) {
			const publicId = CloudinaryService.extractPublicId(article.image)

			if (publicId) {
				await CloudinaryService.delete(publicId)
			}
		}
	}

	static sanitizeTitle(title: string): string {
		return title.trim().replace(/\s+/g, ' ').slice(0, 120)
	}

	static sanitizeImageUrl(url?: string): string | undefined {
		if (!url) {
			return undefined
		}

		try {
			const parsed = new URL(url)
			const allowedProtocols = ['http:', 'https:']

			if (!allowedProtocols.includes(parsed.protocol)) {
				return undefined
			}

			return parsed.toString()
		} catch {
			return undefined
		}
	}

	static getPostTemplate(title: string, imageUrl: string): string {
		const safeTitle = ArticleImageService.sanitizeTitle(title)
		const safeImageUrl = ArticleImageService.sanitizeImageUrl(imageUrl)

		return `<html>

    <body>
        <div class="canvas">
            <h2>NUEVO</h2>

            <img src="${safeImageUrl}"
                class="article-image" />

            <h1>${safeTitle}</h1>

            <div class="footer">
                <h2>ARTÍCULO</h2>
                <h3>@noti.evan</h3>
            </div>
        </div>

        <style>
            @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Racing+Sans+One&display=swap');

            body {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #222;
                text-align: center;
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .footer {
                margin-top: auto;
            }

            h1 {
                color: #E10F00;
                font-size: 80px;
                margin-top: 16px;
                font-weight: 300;
                line-height: 100px;
                transform: rotateZ(-3deg);
                font-family: "Lexend", serif;
            }

            h2 {
                font-size: 148px;
                font-weight: bold;
                color: #134abf;
                font-family: "Racing Sans One", serif;
            }

            h3 {
                color: #134abf;
                font-size: 48px;
                font-weight: 300;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
            }

            .article-image {
                width: 850px;
                height: 500px;
                object-fit: cover;
                border-color: white;
                border-width: 28px;
                border-style: solid;
                border-radius: 8px;
                box-shadow: 10px 10px 40px #0005;
                transform: rotateZ(-3deg);
            }

            .canvas {
                width: 1080px;
                height: 1350px;
                position: relative;
                overflow: hidden;
                padding: 84px;
                align-items: center;
                display: flex;
                flex-direction: column;

                background: linear-gradient(336deg,
                        rgba(255, 255, 255, 1) 20%,
                        rgba(212, 120, 120, 1) 100%);
            }
        </style>
    </body>

    </html>
`
	}
}

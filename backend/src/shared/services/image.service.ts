import { createCanvas, loadImage, type SKRSContext2D } from '@napi-rs/canvas'

type DrawTextParams = {
	ctx: SKRSContext2D
	text: string
	x: number
	y: number
	maxWidth: number
	lineHeight: number
}

type CreateImageParams = {
	width: number
	height: number
	backgroundColor?: string
	draw: (ctx: SKRSContext2D) => Promise<void> | void
}

export class ImageService {
	static async create(params: CreateImageParams): Promise<Buffer> {
		const { width, height, backgroundColor = '#000000', draw } = params

		const canvas = createCanvas(width, height)

		const ctx = canvas.getContext('2d')

		// fondo base
		ctx.fillStyle = backgroundColor

		ctx.fillRect(0, 0, width, height)

		// dibujo custom
		await draw(ctx)

		return canvas.toBuffer('image/png')
	}

	static async drawImage(params: {
		ctx: SKRSContext2D
		imageUrl: string
		x: number
		y: number
		width: number
		height: number
	}) {
		const { ctx, imageUrl, x, y, width, height } = params

		const image = await loadImage(imageUrl)

		ctx.drawImage(image, x, y, width, height)
	}

	static drawRect(params: {
		ctx: SKRSContext2D
		x: number
		y: number
		width: number
		height: number
		color: string
	}) {
		const { ctx, x, y, width, height, color } = params

		ctx.fillStyle = color

		ctx.fillRect(x, y, width, height)
	}

	static drawText(params: {
		ctx: SKRSContext2D
		text: string
		x: number
		y: number
		font: string
		color?: string
	}) {
		const { ctx, text, x, y, font, color = '#ffffff' } = params

		ctx.font = font
		ctx.fillStyle = color

		ctx.fillText(text, x, y)
	}

	static drawMultilineText(params: DrawTextParams) {
		const { ctx, text, x, y, maxWidth, lineHeight } = params

		const words = text.split(' ')

		let line = ''
		let currentY = y

		for (const word of words) {
			const testLine = `${line}${word} `

			const width = ctx.measureText(testLine).width

			if (width > maxWidth && line) {
				ctx.fillText(line, x, currentY)

				line = `${word} `

				currentY += lineHeight
			} else {
				line = testLine
			}
		}

		ctx.fillText(line, x, currentY)
	}

	static async drawCoverImage(params: {
		ctx: SKRSContext2D
		imageUrl: string
		x: number
		y: number
		width: number
		height: number
	}) {
		const { ctx, imageUrl, x, y, width, height } = params

		const image = await loadImage(imageUrl)

		const imageAspect = image.width / image.height

		const canvasAspect = width / height

		let drawWidth = width
		let drawHeight = height

		let offsetX = 0
		let offsetY = 0

		// imagen más ancha
		if (imageAspect > canvasAspect) {
			drawWidth = height * imageAspect

			offsetX = (width - drawWidth) / 2
		}

		// imagen más alta
		else {
			drawHeight = width / imageAspect

			offsetY = (height - drawHeight) / 2
		}

		ctx.drawImage(image, x + offsetX, y + offsetY, drawWidth, drawHeight)
	}
}

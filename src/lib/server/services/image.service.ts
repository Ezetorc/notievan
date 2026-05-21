import chromium from '@sparticuz/chromium'
import { type Browser, chromium as playwright } from 'playwright-core'
import { error } from '@sveltejs/kit'
import { env } from 'server/configuration/env.configuration'
import { ErrorCode } from 'shared/models/error-code.model'

export class ImageService {
	private static browserInstance: Browser | null = null
	private static browserPromise: Promise<Browser> | null = null

	private static async launchBrowser(): Promise<Browser> {
		if (env.nodeEnv === 'production') {
			return playwright.launch({
				args: chromium.args,
				executablePath: await chromium.executablePath(),
				headless: true
			})
		}

		const { chromium: localChromium } = await import('playwright')

		return localChromium.launch({
			headless: true
		})
	}

	static async getBrowser(): Promise<Browser> {
		if (ImageService.browserInstance) {
			return ImageService.browserInstance
		}

		if (ImageService.browserPromise) {
			return ImageService.browserPromise
		}

		ImageService.browserPromise = ImageService.launchBrowser()

		try {
			ImageService.browserInstance = await ImageService.browserPromise

			return ImageService.browserInstance
		} finally {
			ImageService.browserPromise = null
		}
	}

	static async generate({
		width,
		height,
		html
	}: {
		width: number
		height: number
		html: string
	}): Promise<Buffer> {
		const browser = await ImageService.getBrowser()

		const page = await browser.newPage({
			viewport: {
				width,
				height
			},
			deviceScaleFactor: 2
		})

		try {
			await page.setContent(html, {
				waitUntil: 'networkidle'
			})

			const buffer = await page.screenshot({
				type: 'jpeg'
			})

			return buffer
		} finally {
			await page.close()
		}
	}

	static validateImage(file: File) {
		if (file.size > 5 * 1024 * 1024) {
			throw error(400, ErrorCode.FILE_TOO_LARGE)
		}

		if (!file.type.startsWith('image/')) {
			throw error(400, ErrorCode.INVALID_IMAGE)
		}
	}
}

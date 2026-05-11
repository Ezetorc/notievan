import { chromium as playwright, type Browser } from 'playwright-core'
import chromium from '@sparticuz/chromium'
import { env } from '../configuration/env.configuration.js'

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
		// Browser ya inicializado
		if (ImageService.browserInstance) {
			return ImageService.browserInstance
		}

		// Ya hay una inicialización en progreso
		if (ImageService.browserPromise) {
			return ImageService.browserPromise
		}

		// Crear lock
		ImageService.browserPromise = ImageService.launchBrowser()

		try {
			ImageService.browserInstance = await ImageService.browserPromise

			return ImageService.browserInstance
		} finally {
			// Limpiar lock aunque falle
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
}

import { chromium as playwright, type Browser } from 'playwright-core'
import chromium from '@sparticuz/chromium'
import { env } from '../configuration/env.configuration.js'

export class ImageService {
	private browserInstance: Browser = null

	async getBrowser(): Promise<Browser> {
		if (this.browserInstance) {
			return this.browserInstance
		}

		if (env.nodeEnv === 'production') {
			this.browserInstance = await playwright.launch({
				args: chromium.args,
				executablePath: await chromium.executablePath(),
				headless: true
			})

			return this.browserInstance
		}

		const { chromium: localChromium } = await import('playwright')

		this.browserInstance = await localChromium.launch({
			headless: true
		})

		return this.browserInstance
	}

	async generate({
		width,
		height,
		html
	}: {
		width: number
		height: number
		html: string
	}): Promise<Buffer> {
		const browser = await this.getBrowser()

		const page = await browser.newPage({
			viewport: {
				width,
				height
			},
			deviceScaleFactor: 2
		})

		await page.setContent(html, {
			waitUntil: 'networkidle'
		})

		const buffer = await page.screenshot({
			type: 'jpeg'
		})

		await page.close()

		return buffer
	}
}

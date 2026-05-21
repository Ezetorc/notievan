export function isRecent(date: Date | string): boolean {
	const threshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
	const parsedDate = date instanceof Date ? date : new Date(date)

	return parsedDate > threshold
}

export function isRecent(date: Date | string): boolean {
	return new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
}

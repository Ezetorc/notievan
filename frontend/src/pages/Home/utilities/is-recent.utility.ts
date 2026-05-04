import { subDays, isToday, isYesterday, isSameDay } from 'date-fns'

export function isRecent(date: Date | string): boolean {
	const today = new Date()
	const dayBeforeYesterday = subDays(today, 2)

	return (
		isToday(date) || isYesterday(date) || isSameDay(date, dayBeforeYesterday)
	)
}

import { useEffect, useRef } from 'react'

type UseInfiniteScrollParams = {
	hasMore: boolean
	loading: boolean
	onLoadMore: () => void
	root?: Element | null
	rootMargin?: string
	threshold?: number
	disabled?: boolean
}

export function useInfiniteScroll({
	hasMore,
	loading,
	onLoadMore,
	root = null,
	rootMargin = '200px',
	threshold = 0,
	disabled = false
}: UseInfiniteScrollParams) {
	const sentinelRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (disabled) {
			return
		}
		if (!sentinelRef.current) {
			return
		}

		const element = sentinelRef.current

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]

				if (entry.isIntersecting && hasMore && !loading) {
					onLoadMore()
				}
			},
			{ root, rootMargin, threshold }
		)

		observer.observe(element)

		return () => {
			observer.unobserve(element)
			observer.disconnect()
		}
	}, [hasMore, loading, onLoadMore, root, rootMargin, threshold, disabled])

	return { sentinelRef }
}

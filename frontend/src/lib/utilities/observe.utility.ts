export function observe(element: HTMLElement, onIntersect: () => void) {
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				onIntersect();
			}
		},
		{
			threshold: 1.0
		}
	);

	observer.observe(element);

	return () => {
		observer.disconnect();
	};
}

import { useQuery } from '@tanstack/react-query';

export function useRandomImage({
	id,
	width = 1200,
	height = 675,
	enabled,
}: {
	id?: string;
	width?: number;
	height?: number;
	enabled?: boolean;
}) {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['random-image', id],
		queryFn: async () =>
			await fetch(`https://picsum.photos/${width}/${height}`).then(
				(res) => res.url
			),
		retry: false,
		staleTime: 1000 * 60 * 5,
		enabled: enabled && Boolean(id),
	});

	return {
		image: data,
		isLoading,
		error,
		isError,
		refetch,
	};
}

import { useQuery } from "@tanstack/react-query";
import { ArticlesService } from "../services/articles.service";

export function useArticles({ limit = 4 }: { limit?: number } = {}) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["articles", "main", limit],
        queryFn: () => ArticlesService.getAll({ page: 1, limit }),
        staleTime: 1000 * 60 * 5,
    });

    return {
        articles: data ?? [],
        loading: isLoading,
        error,
        isError,
    };
}

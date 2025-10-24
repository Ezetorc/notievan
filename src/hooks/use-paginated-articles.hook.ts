import { useInfiniteQuery } from "@tanstack/react-query";
import type { Article } from "@prisma/client";
import { ArticlesService } from "../services/articles.service";

type usePaginatedArticlesOptions = {
  type?: "all" | "own" | "random";
  excludeId?: string;
  initialPage?: number;
  limit?: number;
};

export function usePaginatedArticles({
  type = "all",
  excludeId,
  initialPage = 1,
  limit = 4,
}: usePaginatedArticlesOptions) {
  const query = useInfiniteQuery({
    queryKey: ["articles", type, excludeId],
    queryFn: async ({ pageParam = initialPage }): Promise<Article[]> => {
      switch (type) {
        case "own":
          return ArticlesService.getOwn({ page: pageParam, limit });
        case "random":
          if (excludeId) return ArticlesService.getRandom(excludeId);
          return [];
        default:
          return ArticlesService.getAll({ page: pageParam, limit });
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length + initialPage;
    },
    initialPageParam: initialPage,
  });

  const articles = query.data?.pages.flat() ?? [];

  const hasMore = !!query.hasNextPage;
  const loading = query.isFetching && !query.isFetchingNextPage;

  const loadMore = () => {
    if (hasMore) query.fetchNextPage();
  };

  return {
    articles,
    loading,
    hasMore,
    loadMore,
  };
}

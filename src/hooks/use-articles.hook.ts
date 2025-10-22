import { useEffect, useState } from "react";
import type { Article } from "@prisma/client";
import { ArticlesService } from "../services/articles.service";

type UseArticlesOptions = {
    type?: "all" | "own" | "random";
    excludeId?: string;
    initialPage?: number;
    limit?: number;
}

export function useArticles({
    type = "all",
    excludeId,
    initialPage = 0,
    limit = 4,
}: UseArticlesOptions) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadArticles(page);
    }, [page, excludeId]);

    async function loadArticles(pageToLoad: number) {
        setLoading(true);

        try {
            let data: Article[] = [];

            switch (type) {
                case "own":
                    data = await ArticlesService.getOwn({ page: pageToLoad, limit });
                    break;
                case "random":
                    if (excludeId) data = await ArticlesService.getRandom(excludeId);
                    break;
                case "all":
                default:
                    data = await ArticlesService.getAll({ page: pageToLoad, limit });
            }

            if (type !== "random") {
                if (data.length < limit) setHasMore(false);
                setArticles((prev) => [...prev, ...data]);
            } else {
                setArticles(data);
            }
        } finally {
            setLoading(false);
        }
    }

    function loadMore() {
        if (hasMore) setPage((prev) => prev + 1);
    }

    return { articles, loading, hasMore, loadMore };
}

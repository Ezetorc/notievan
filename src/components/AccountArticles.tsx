import { useEffect, useState } from "react";
import { ArticlesService } from "../services/articles.service";
import type { Article } from "@prisma/client";
import { SmallArticle } from "./SmallArticle";

export function AccountArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  useEffect(() => {
    loadArticles(page);
  }, [page]);

  const loadArticles = async (pageToLoad: number) => {
    const data = await ArticlesService.getOwn({ page: pageToLoad, limit });

    if (data.length < limit) setHasMore(false);
    setArticles((prev) => [...prev, ...data]);
  };

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  if (articles.length > 0) {
    return (
      <section className="my-9">
        <main
          className="w-full min-h-[400px] grid
           mobile:grid-rows-4 mobile:grid-cols-1
           desktop:grid-rows-1 desktop:grid-cols-4
           gap-8"
        >
          {articles.map((article) => (
            <SmallArticle key={article.id} article={article} />
          ))}
        </main>

        {hasMore && (
          <button
            className="w-full mt-6 py-5 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleLoadMore}
          >
            Cargar más
          </button>
        )}
      </section>
    );
  }
}

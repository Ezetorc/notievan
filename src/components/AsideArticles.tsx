import { useEffect, useState } from "react";
import { ArticlesService } from "../services/articles.service";
import { SmallArticle } from "./SmallArticle";
import type { Article as ArticleData } from "@prisma/client";

interface Props {
  excludeId?: string;
  limit?: number;
}

export function AsideArticles({ excludeId, limit = 4 }: Props) {
  const [articles, setArticles] = useState<ArticleData[] | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      const all = await ArticlesService.getAll(limit);
      const filtered = excludeId ? all.filter((a) => a.id !== excludeId) : all;
      setArticles(filtered);
    }
    fetchArticles();
  }, [excludeId, limit]);

  if (!articles) {
    return (
      <aside className="flex w-full h-full flex-col gap-y-5">
        {Array.from({ length: limit }).map((_, i) => (
          <SmallArticle key={i} />
        ))}
      </aside>
    );
  }

  return (
    <aside className="flex w-full h-full flex-col gap-y-5">
      {articles.map((article) => (
        <SmallArticle key={article.id} article={article} />
      ))}
    </aside>
  );
}

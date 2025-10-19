import { useEffect, useState } from "react";
import { ArticlesService } from "../services/articles.service";
import { SmallArticle } from "./SmallArticle";
import type { Article as ArticleData } from "@prisma/client";

interface Props {
  excludeId: string;
}

export function AsideArticles({ excludeId }: Props) {
  const [articles, setArticles] = useState<ArticleData[] | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      const articles = await ArticlesService.getRandom(excludeId);
      setArticles(articles);
    }

    fetchArticles();
  }, [excludeId]);

  if (!articles) {
    return (
      <aside className="flex w-full h-full flex-col gap-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
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

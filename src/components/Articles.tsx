import { useEffect, useState } from "react";
import BigArticle from "./BigArticle";
import { ArticlesService } from "../services/articles.service";
import type { Article } from "@prisma/client";

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    ArticlesService.getAll(4).then(setArticles);
  }, []);

  return (
    <main
      className="w-full min-h-[650px] grid
         mobile:grid-rows-4 mobile:grid-cols-1
         desktop:grid-rows-1 desktop:grid-cols-4
         gap-8"
    >
      {articles.map((article) => (
        <BigArticle key={article.id} article={article} />
      ))}
    </main>
  );
}

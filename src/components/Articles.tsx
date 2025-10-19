import { useEffect, useState } from "react";
import BigArticle from "./BigArticle";
import { ArticlesService } from "../services/articles.service";
import type { Article } from "@prisma/client";

export function Articles() {
  const [articles, setArticles] = useState<Array<Article | undefined>>([]);

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
      <BigArticle article={articles[0]} />
      <BigArticle article={articles[1]} />
      <BigArticle article={articles[2]} />
      <BigArticle article={articles[3]} />
    </main>
  );
}

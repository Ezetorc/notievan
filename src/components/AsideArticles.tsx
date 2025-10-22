import { useArticles } from "../hooks/use-articles.hook";
import { SmallArticle } from "./SmallArticle";

export function AsideArticles({ excludeId }: { excludeId: string }) {
  const { articles, loading } = useArticles({ type: "random", excludeId });

  if (loading || !articles.length) {
    return (
      <aside className="flex flex-col gap-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <SmallArticle key={i} />
        ))}
      </aside>
    );
  }

  return (
    <aside className="flex flex-col gap-y-5">
      {articles.map((article) => (
        <SmallArticle key={article.id} article={article} />
      ))}
    </aside>
  );
}

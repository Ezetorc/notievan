import { usePaginatedArticles } from "../hooks/use-paginated-articles.hook";
import { QueryProvider } from "./QueryProvider";
import { SmallArticle } from "./SmallArticle";

function AsideArticlesLogic({ excludeId }: { excludeId: string }) {
  const { articles, loading } = usePaginatedArticles({
    type: "random",
    excludeId,
  });

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

export function AsideArticles({ excludeId }: { excludeId: string }) {
  return (
    <QueryProvider>
      <AsideArticlesLogic excludeId={excludeId} />
    </QueryProvider>
  );
}

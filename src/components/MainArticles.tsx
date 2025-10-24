import { BigArticle } from "./BigArticle";
import { useArticles } from "../hooks/use-articles.hook";
import { QueryProvider } from "./QueryProvider";

function MainArticlesLogic() {
  const { articles } = useArticles();

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

export function MainArticles() {
  return (
    <QueryProvider>
      <MainArticlesLogic />
    </QueryProvider>
  );
}

import { QueryProvider } from "./QueryProvider";
import { MainArticles } from "./MainArticles";
import { SecondaryArticles } from "./SecondaryArticles";

export default function ArticlesContainer() {
  return (
    <QueryProvider>
      <MainArticles />
      <SecondaryArticles />
    </QueryProvider>
  );
}

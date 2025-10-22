import type { Article as ArticleData } from "@prisma/client";
import { Article } from "./Article";
import { H3 } from "./H3";
import { H4 } from "./H4";
import { H5 } from "./H5";
import { useAuthorName } from "../hooks/use-author-name.hook";

interface Props {
  article?: ArticleData;
}

export function BigArticle({ article }: Props) {
  const authorName = useAuthorName(article?.authorId);

  if (!article) {
    return (
      <article className="animate-pulse flex flex-col gap-y-4 w-full">
        <div className="min-h-[100px] mobile:max-h-[200px] desktop:max-h-[400px] h-full aspect-[9/16] bg-gray-300 w-full object-cover"></div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="rounded-[8px] h-6 w-[80%] bg-gray-300" />
          <div className="rounded-[8px] h-8 w-[90%] bg-gray-300" />
          <div className="rounded-[8px] h-12 bg-gray-300" />
          <div className="rounded-[8px] h-4 w-[50%] bg-gray-300" />
        </div>
      </article>
    );
  }

  return (
    <Article id={article.id} className="flex flex-col gap-y-4 w-full">
      <img
        loading="eager"
        src={article.image}
        alt={article.title}
        className="min-h-[100px] mobile:max-h-[200px] desktop:max-h-[400px] h-full aspect-[9/16] bg-gray-200 w-full object-cover"
      />
      <div className="flex flex-col gap-y-2 w-full">
        <H4 className="text-3xl break-words">{article.subtitle}</H4>
        <H3 className="text-3xl break-words">{article.title}</H3>
        <p className="text-gray-900 text-[18px] break-words">
          {article.description}
        </p>
        <H5 className="mt-2 break-words">{authorName}</H5>
      </div>
    </Article>
  );
}

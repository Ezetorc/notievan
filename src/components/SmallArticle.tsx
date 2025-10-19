import type { Article as ArticleData } from "@prisma/client";
import { useEffect, useState } from "react";
import { UsersService } from "../services/users.service";
import { Article } from "./Article";
import { H3 } from "./H3";
import { H4 } from "./H4";
import { H5 } from "./H5";

interface Props {
  article?: ArticleData;
}

export function SmallArticle({ article }: Props) {
  const [authorName, setAuthorName] = useState("...");

  useEffect(() => {
    async function fetchAuthor(article: ArticleData) {
      const name = await UsersService.getNameOfUserWithId(article.authorId);
      setAuthorName(name);
    }

    if (article) {
      fetchAuthor(article);
    }
  }, [article]);

  if (!article) {
    return (
      <article className="animate-pulse flex flex-col gap-y-4 w-full">
        <div className="min-h-[100px] max-h-[200px] h-full aspect-[9/16] bg-gray-300 w-full object-cover"></div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="h-6 w-[80%] bg-gray-300 rounded-[8px]" />
          <div className="h-8 w-[90%] bg-gray-300 rounded-[8px]" />
          <div className="h-4 w-[50%] bg-gray-300 rounded-[8px]" />
        </div>
      </article>
    );
  }

  return (
    <Article id={article.id} className="flex flex-col gap-y-4 w-full">
      <img
        loading="eager"
        src={article.thumbnailUrl}
        alt={article.thumbnailAlt}
        className="min-h-[100px] max-h-[200px] h-full aspect-[9/16] bg-gray-200 w-full object-cover"
      />

      <div className="flex flex-col gap-y-2 w-full">
        <H4 className="text-3xl break-words">{article.subtitle}</H4>
        <H3 className="text-3xl break-words">{article.title}</H3>
        <H5 className="mt-2 break-words">{authorName}</H5>
      </div>
    </Article>
  );
}

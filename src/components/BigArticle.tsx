import type { Article as ArticleData } from "@prisma/client";
import { useEffect, useState } from "react";
import { UsersService } from "../services/users.service";
import { H3 } from "./H3";
import { H4 } from "./H4";
import { H5 } from "./H5";
import { Article } from "./Article";

interface Props {
  article: ArticleData;
}

export default function BigArticle({ article }: Props) {
  const [authorName, setAuthorName] = useState("...");

  useEffect(() => {
    async function fetchAuthor() {
      const name = await UsersService.getNameOfUserWithId(article.authorId);
      setAuthorName(name);
    }
    fetchAuthor();
  }, [article.authorId]);

  return (
    <Article id={article.id} className="flex flex-col gap-y-4 w-full">
      <img
        loading="eager"
        src={article.thumbnailUrl}
        alt={article.thumbnailAlt}
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

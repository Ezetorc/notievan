import type { Article } from "@prisma/client";
import { ArticlesService } from "../services/articles.service";

export async function getArticleFromPath(): Promise<Article | undefined> {
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1] || undefined;

    if (!id) return

    let article: Article | undefined;

    try {
        article = await ArticlesService.getById(id);
    } catch (error) {
        return undefined;
    }

    if (!article) return

    return article
}
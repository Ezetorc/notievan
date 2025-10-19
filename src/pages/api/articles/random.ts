import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { OkResponse } from "../../../models/ok-response.model";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const omitId = url.searchParams.get("omit");

    const allArticleIds = await prisma.article.findMany({
      where: omitId ? { id: { not: omitId } } : {},
      select: { id: true },
    });

    const shuffledIds = allArticleIds
      .map((a) => a.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    const articles = await prisma.article.findMany({
      where: { id: { in: shuffledIds } },
    });

    return new OkResponse(articles);
  } catch (error) {
    console.error("Error obtaining random articles:", error);
    return new InternalServerError();
  }
};

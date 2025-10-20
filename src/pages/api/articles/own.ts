import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { OkResponse } from "../../../models/ok-response.model";
import { getUserFromToken } from "../../../utilities/get-user-from-token.utility";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get("limit");
    const pageParam = url.searchParams.get("page");
    const authHeader = request.headers.get("Authorization");
    const user = await getUserFromToken(authHeader);
    const limit =
      limitParam && parseInt(limitParam) > 0 ? parseInt(limitParam) : 4;
    let page = pageParam ? parseInt(pageParam) : 1;
    if (page < 1) page = 1;

    const skip = (page - 1) * limit;

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        authorId: true,
        content: false,
        createdAt: false,
        description: true,
        id: true,
        subtitle: true,
        thumbnailAlt: true,
        thumbnailUrl: true,
        title: true,
      },
      where: { authorId: user.id },
      take: limit,
      skip,
    });

    const totalArticles = await prisma.article.count({
      where: { authorId: user.id },
    });
    const totalPages = Math.ceil(totalArticles / limit);

    return new OkResponse({
      data: articles,
      meta: {
        page,
        limit,
        totalPages,
        totalArticles,
      },
    });
  } catch (error) {
    console.error("Error obtaining articles:", error);
    return new InternalServerError();
  }
};

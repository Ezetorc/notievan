import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/errors/internal-server.error";
import { OkResponse } from "../../../models/responses/ok.response";
import { PaginationParamsDto } from "../../../models/dtos/pagination-params.dto";
import { BadRequestError } from "../../../models/errors/bad-request.error";
import { ZodError } from "zod";
import { authMiddleware } from "../../../middlewares/auth.middleware";

export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await authMiddleware(request)
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const { limit, page } = PaginationParamsDto.parse(query);
    const skip = (page - 1) * limit;

    const articles = await prisma.article.findMany({
      where: { authorId: user.id },
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
      take: limit,
      skip,
    });

    const totalArticles = await prisma.article.count();
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
    console.error("Error in GET /api/articles/own:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

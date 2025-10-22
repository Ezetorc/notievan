import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/errors/internal-server.error";
import { OkResponse } from "../../../models/responses/ok.response";
import { BadRequestError } from "../../../models/errors/bad-request.error";
import { ZodError } from "zod";
import { OmitIdParamDto } from "../../../models/dtos/omit-id-param.dto";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const { omit } = OmitIdParamDto.parse({
      omit: url.searchParams.get("omit"),
    });

    const allArticleIds = await prisma.article.findMany({
      where: omit ? { id: { not: omit } } : {},
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
    console.error("Error in GET /api/articles/random:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { NotFoundError } from "../../../models/not-found-error.model";
import { OkResponse } from "../../../models/ok-response.model";

export const GET: APIRoute = async ({ params }) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return new NotFoundError("Article not found");
    }
    
    return new OkResponse(article)
  } catch (error) {
    return new InternalServerError();
  }
};

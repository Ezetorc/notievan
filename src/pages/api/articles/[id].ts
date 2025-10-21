import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { NotFoundError } from "../../../models/not-found-error.model";
import { OkResponse } from "../../../models/ok-response.model";
import { getUserFromToken } from "../../../utilities/get-user-from-token.utility";
import { UnauthorizedError } from "../../../models/unauthorized-error.model";

export const GET: APIRoute = async ({ params }) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return new NotFoundError("Artículo no encontrado");
    }

    return new OkResponse(article);
  } catch (error) {
    return new InternalServerError();
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return new UnauthorizedError("No se encontró token");
    }

    const user = await getUserFromToken(authHeader);
    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return new NotFoundError("Artículo no encontrado");
    }

    if (user.id !== article.authorId) {
      return new UnauthorizedError("No podés eliminar artículos de otra persona");
    }

    await prisma.article.delete({ where: { id: params.id } });
    return new OkResponse("Artículo eliminado");
  } catch (err) {
    console.error(err);
    return new InternalServerError();
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return new UnauthorizedError("No token provided");
    }

    const user = await getUserFromToken(authHeader);

    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return new NotFoundError("Article not found");
    }

    if (user.id !== article.authorId) {
      return new UnauthorizedError("You can't update other's articles");
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title && !content) {
      return new InternalServerError("Nothing to update");
    }

    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return new OkResponse(updatedArticle);
  } catch (err) {
    console.error(err);
    return new InternalServerError();
  }
};

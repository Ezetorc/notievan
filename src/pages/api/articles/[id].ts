import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/errors/internal-server.error";
import { NotFoundError } from "../../../models/errors/not-found.error";
import { OkResponse } from "../../../models/responses/ok.response";
import { UnauthorizedError } from "../../../models/errors/unauthorized.error";
import { validateArticleFormData } from "../../../utilities/validate-article-form-data.utility";
import { UserIdParamDto } from "../../../models/dtos/user-id-param.dto";
import { BadRequestError } from "../../../models/errors/bad-request.error";
import { ZodError } from "zod";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { UpdateArticleDto } from "../../../models/dtos/update-article.dto";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = UserIdParamDto.parse(params);

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return new NotFoundError("Artículo no encontrado");
    }

    return new OkResponse(article);
  } catch (error) {
    console.error("Error in GET /api/articles/[id]:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const { id } = UserIdParamDto.parse(params);
    const user = await authMiddleware(request)
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return new NotFoundError("Artículo no encontrado");
    }

    if (user.id !== article.authorId) {
      return new UnauthorizedError(
        "No podés eliminar artículos de otra persona"
      );
    }

    await prisma.article.delete({ where: { id: params.id } });

    return new OkResponse("Artículo eliminado");
  } catch (error) {
    console.error("Error in DELETE /api/articles/[id]:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { id } = UserIdParamDto.parse(params);
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return new NotFoundError("Artículo no encontrado");
    }

    const user = await authMiddleware(request)

    if (user.id !== article.authorId) {
      return new UnauthorizedError("No se puede editar artículos de otros");
    }

    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    const data = UpdateArticleDto.parse(body);

    await prisma.article.update({ where: { id }, data });

    return new OkResponse("Artículo editado");
  } catch (error) {
    console.error("Error in PATCH /api/articles/[id]:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

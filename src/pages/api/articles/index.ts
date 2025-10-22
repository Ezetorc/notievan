import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/errors/internal-server.error";
import { CreatedResponse } from "../../../models/responses/created.response";
import { ForbiddenError } from "../../../models/errors/forbidden.error";
import { OkResponse } from "../../../models/responses/ok.response";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { CreateArticleDto } from "../../../models/dtos/create-article.dto";
import { CloudinaryService } from "../../../services/cloudinary.service";
import { ZodError } from "zod";
import { BadRequestError } from "../../../models/errors/bad-request.error";
import { PaginationParamsDto } from "../../../models/dtos/pagination-params.dto";

export const POST: APIRoute = async ({ request }) => {
  try {
    const user = await authMiddleware(request)

    console.log("user: ", user)

    if (user.role !== Role.AUTHOR) {
      return new ForbiddenError("No tenés acceso");
    }

    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    const data = CreateArticleDto.parse(body);

    console.log("data: ", data)
    const uploadResult = await CloudinaryService.upload(data.image, "articles");

    console.log("llegó acá")

    const article = await prisma.article.create({
      data: {
        ...data,
        authorId: user.id,
        image: uploadResult.secure_url,
      },
    });

    return new CreatedResponse(article);
  } catch (error) {
    console.error("Error in POST /api/articles:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const { limit, page } = PaginationParamsDto.parse(query);
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
        image: true,
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
    console.error("Error in GET /api/articles:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

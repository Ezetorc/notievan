import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { getUserFromToken } from "../../../utilities/get-user-from-token.utility";
import { uploadToCloudinary } from "../../../utilities/upload-to-cloudinary.utility";
import { validateArticleFormData } from "../../../utilities/validate-article-form-data.utility";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { CreatedResponse } from "../../../models/created-response.model";
import { ForbiddenError } from "../../../models/forbidden-error.model";
import { OkResponse } from "../../../models/ok-response.model";

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("authorization");
    const user = await getUserFromToken(authHeader);

    if (user.role !== "AUTHOR") {
      return new ForbiddenError("You don't have access");
    }

    const formData = await request.formData();
    const { title, subtitle, description, content, thumbnailAlt, file } =
      validateArticleFormData(formData);

    const uploadResult = await uploadToCloudinary(file, "articles");

    const article = await prisma.article.create({
      data: {
        title,
        subtitle,
        description,
        content,
        authorId: user.id,
        thumbnailUrl: uploadResult.secure_url,
        thumbnailAlt,
      },
    });

    return new CreatedResponse(JSON.stringify(article));
  } catch (error: any) {
    console.error("Error creating article:", error);

    return new InternalServerError(error.message);
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const amountParam = url.searchParams.get("amount");

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: amountParam ? parseInt(amountParam) : 4,
    });

    return new OkResponse(articles);
  } catch (error) {
    console.error("Error obtaining articles:", error);
    return new InternalServerError();
  }
};

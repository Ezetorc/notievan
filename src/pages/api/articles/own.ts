import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { OkResponse } from "../../../models/ok-response.model";
import { getUserFromToken } from "../../../utilities/get-user-from-token.utility";

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("authorization");
    const user = await getUserFromToken(authHeader);
    const url = new URL(request.url);
    const amountParam = url.searchParams.get("amount");

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      where: { authorId: user.id },
      take: amountParam ? parseInt(amountParam) : 4,
    });

    return new OkResponse(articles);
  } catch (error) {
    console.error("Error obtaining articles:", error);
    return new InternalServerError();
  }
};

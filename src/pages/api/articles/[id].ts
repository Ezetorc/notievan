import type { APIRoute } from "astro";
import { prisma } from "../../../configuration/prisma.configuration";

export const GET: APIRoute = async ({ params }) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });
    if (!article) {
      return new Response(JSON.stringify({ error: "Artículo no encontrado" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al buscar el artículo" }),
      { status: 500 }
    );
  }
};

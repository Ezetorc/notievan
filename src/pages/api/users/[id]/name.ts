import type { APIRoute } from "astro";
import { prisma } from "../../../../configuration/prisma.configuration";
import { BadRequestError } from "../../../../models/bad-request-error.model";
import { NotFoundError } from "../../../../models/not-found-error.model";
import { OkResponse } from "../../../../models/ok-response.model";
import { InternalServerError } from "../../../../models/internal-server-error.model";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;

    if (id === undefined) {
      return new BadRequestError("Falta la ID del usuario");
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { name: true },
    });

    if (!user) {
      return new NotFoundError("Usuario no encontrado");
    }

    return new OkResponse(user.name);
  } catch (error) {
    console.error("Error in /api/users/[id]/name:", error);

    return new InternalServerError();
  }
};

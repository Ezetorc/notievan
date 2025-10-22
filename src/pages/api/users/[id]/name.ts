import type { APIRoute } from "astro";
import { prisma } from "../../../../configuration/prisma.configuration";
import { NotFoundError } from "../../../../models/errors/not-found.error";
import { OkResponse } from "../../../../models/responses/ok.response";
import { InternalServerError } from "../../../../models/errors/internal-server.error";
import { UserIdParamDto } from "../../../../models/dtos/user-id-param.dto";
import { ZodError } from "zod";
import { BadRequestError } from "../../../../models/errors/bad-request.error";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = UserIdParamDto.parse(params);

    const user = await prisma.user.findUnique({
      where: { id },
      select: { name: true },
    });

    if (!user) {
      return new NotFoundError("Usuario no encontrado");
    }

    return new OkResponse(user.name);
  } catch (error) {
    console.error("Error in GET /api/users/[id]/name:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

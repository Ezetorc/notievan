import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { prisma } from "../../../configuration/prisma.configuration";
import { LoginDto } from "../../../models/dtos/login.dto";
import { BadRequestError } from "../../../models/errors/bad-request.error";
import { InternalServerError } from "../../../models/errors/internal-server.error";
import { UnauthorizedError } from "../../../models/errors/unauthorized.error";
import { OkResponse } from "../../../models/responses/ok.response";
import { SanitizedUser } from "../../../models/sanitized-user.model";
import { getAuthorizationToken } from "../../../utilities/get-authorization-token.utility";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { email, password } = LoginDto.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new UnauthorizedError("Email incorrecto");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new UnauthorizedError("Contraseña incorrecta");
    }

    const token = getAuthorizationToken(user);

    return new OkResponse({
      user: new SanitizedUser(user),
      token,
    });
  } catch (error: any) {
    console.error("Error in POST /api/auth/login:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

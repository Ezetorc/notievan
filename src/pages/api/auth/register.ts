import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { prisma } from "../../../configuration/prisma.configuration";
import { RegisterDto } from "../../../models/dtos/register.dto";
import { BadRequestError } from "../../../models/errors/bad-request.error";
import { ConflictError } from "../../../models/errors/conflict.error";
import { InternalServerError } from "../../../models/errors/internal-server.error";
import { CreatedResponse } from "../../../models/responses/created.response";
import { SanitizedUser } from "../../../models/sanitized-user.model";
import { getAuthorizationToken } from "../../../utilities/get-authorization-token.utility";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, name } = RegisterDto.parse(body);

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return new ConflictError("Email en uso");

    const existingName = await prisma.user.findUnique({ where: { name } });
    if (existingName) return new ConflictError("Nombre en uso");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = getAuthorizationToken(newUser);

    return new CreatedResponse({
      user: new SanitizedUser(newUser),
      token,
    });
  } catch (error: any) {
    console.error("Error in POST /api/auth/register:", error);

    if (error instanceof ZodError) {
      return new BadRequestError(error.errors);
    }

    return new InternalServerError();
  }
};

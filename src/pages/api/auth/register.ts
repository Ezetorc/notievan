import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { prisma } from "../../../configuration/prisma.configuration";
import { getAuthorizationToken } from "../../../utilities/get-authorization-token.utility";
import { CreatedResponse } from "../../../models/created-response.model";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { BadRequestError } from "../../../models/bad-request-error.model";
import { ConflictError } from "../../../models/conflict-error.model";
import { SanitizedUser } from "../../../models/sanitized-user.model";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new BadRequestError("Email, nombre y contraseña son requeridos");
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) return new ConflictError("El email ya está tomado");

    const existingName = await prisma.user.findUnique({ where: { name } });
    if (existingName) return new ConflictError("El nombre ya está tomado");

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
  } catch (error) {
    console.error("Error during register", error);

    return new InternalServerError();
  }
};

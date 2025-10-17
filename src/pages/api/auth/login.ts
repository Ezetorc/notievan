import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { prisma } from "../../../configuration/prisma.configuration";
import { BadRequestError } from "../../../models/bad-request-error.model";
import { UnauthorizedError } from "../../../models/unauthorized-error.model";
import { OkResponse } from "../../../models/ok-response.model";
import { getAuthorizationToken } from "../../../utilities/get-authorization-token.utility";
import { InternalServerError } from "../../../models/internal-server-error.model";
import { SanitizedUser } from "../../../models/sanitized-user.model";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new BadRequestError("Email and/or password is/are missing");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new UnauthorizedError("Invalid credentials");
    }

    const token = getAuthorizationToken(user);

    return new OkResponse({
      user: new SanitizedUser(user),
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);

    return new InternalServerError();
  }
};
